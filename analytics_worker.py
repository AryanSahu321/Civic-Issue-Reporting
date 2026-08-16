import os
import json
import logging
import psycopg2
from psycopg2.extras import execute_batch
from confluent_kafka import Consumer, KafkaError
from dotenv import load_dotenv
from sentiment_engine import HybridSentimentEngine

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

consumer_config = {
    "bootstrap.servers": os.getenv("KAFKA_BOOTSTRAP_SERVERS", "localhost:9092"),
    "group.id": "sentiment-analytics-group",
    "auto.offset.reset": "earliest",
    "enable.auto.commit": False,  # Manual commit for exact offset management
}

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432"),
        dbname=os.getenv("DB_NAME", "civic_db"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "password123")
    )

def batch_update_users(records: list):
    """Batch updates user behavioral sentiment and buckets in PostgreSQL."""
    query = """
        INSERT INTO user_analytics (user_id, avg_polarity, sentiment_category, total_reports)
        VALUES (%s, %s, %s, 1)
        ON CONFLICT (user_id) DO UPDATE SET
            avg_polarity = (user_analytics.avg_polarity + EXCLUDED.avg_polarity) / 2,
            sentiment_category = EXCLUDED.sentiment_category,
            total_reports = user_analytics.total_reports + 1,
            updated_at = NOW();
    """
    try:
        conn = get_db_connection()
        with conn.cursor() as cur:
            execute_batch(cur, query, records)
        conn.commit()
        conn.close()
        logger.info(f"Successfully batch updated {len(records)} user profiles in DB.")
    except Exception as e:
        logger.error(f"Failed to batch update database: {e}")

def run_analytics_worker():
    consumer = Consumer(consumer_config)
    consumer.subscribe(["async_analytics"])
    engine = HybridSentimentEngine()

    batch = []
    logger.info("Analytics Worker listening to topic 'async_analytics'...")

    try:
        while True:
            msg = consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                logger.error(f"Kafka error: {msg.error()}")
                break

            data = json.loads(msg.value().decode("utf-8"))
            user_id = data.get("user_id")
            text = data.get("text", "")

            # 1. Compute Polarity Score (-1.0 to +1.0)
            polarity = engine.analyze_text(text)

            # 2. Check Negative vs Thanks tokens
            lower_text = text.lower()
            thanks_ratio = 1.0 if any(w in lower_text for w in ["thank", "thanks", "resolved", "great", "good"]) else 0.0
            neg_ratio = 1.0 if polarity < -0.25 else 0.0

            # 3. Categorize into Haters / Supporters / Neutrals
            bucket = engine.categorize_user(polarity, neg_ratio, thanks_ratio)
            batch.append((user_id, polarity, bucket))

            # Commit offsets in batches of 20
            if len(batch) >= 20:
                batch_update_users(batch)
                consumer.commit(asynchronous=False)
                batch.clear()

    except KeyboardInterrupt:
        logger.info("Stopping Analytics Worker...")
    finally:
        if batch:
            batch_update_users(batch)
            consumer.commit(asynchronous=False)
        consumer.close()

if __name__ == "__main__":
    run_analytics_worker()