from sentiment_engine import HybridSentimentEngine

def run_mock_pipeline():
    engine = HybridSentimentEngine()
    
    mock_events = [
        {"user_id": "usr_101", "text": "Thank you for fixing the water leakage so quickly, great work!"},
        {"user_id": "usr_102", "text": "The road is still broken, terrible service and useless administration!"},
        {"user_id": "usr_103", "text": "Pothole reported near central park main gate."}
    ]
    
    print("\n--- SIMULATING ASYNC ANALYTICS PIPELINE ---")
    for event in mock_events:
        text = event["text"]
        polarity = engine.analyze_text(text)
        
        lower_text = text.lower()
        thanks_ratio = 1.0 if any(w in lower_text for w in ["thank", "thanks", "great", "good"]) else 0.0
        neg_ratio = 1.0 if polarity < -0.25 else 0.0
        
        category = engine.categorize_user(polarity, neg_ratio, thanks_ratio)
        
        print(f"User: {event['user_id']} | Polarity: {polarity:.2f} | Category: {category}")

if __name__ == "__main__":
    run_mock_pipeline()