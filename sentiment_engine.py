import numpy as np
import torch
from scipy.special import softmax
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

class HybridSentimentEngine:
    def __init__(self, model_name: str = "cardiffnlp/twitter-roberta-base-sentiment-latest"):
        # 1. Initialize VADER (Fast rule-based lexicon)
        self.vader = SentimentIntensityAnalyzer()
        
        # 2. Initialize CardiffNLP RoBERTa
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.roberta_model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.roberta_model.eval()

    def _get_roberta_polarity(self, text: str) -> float:
        """Calculates RoBERTa polarity score between -1.0 and 1.0."""
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            outputs = self.roberta_model(**inputs)
        
        scores = outputs.logits[0].detach().numpy()
        probs = softmax(scores)  # [negative, neutral, positive]
        
        # Scalar polarity: Positive prob (+1.0) - Negative prob (-1.0)
        return float(probs[2] - probs[0])

    def _get_vader_polarity(self, text: str) -> float:
        """Calculates VADER compound score [-1.0 to 1.0]."""
        return self.vader.polarity_scores(text)["compound"]

    def analyze_text(self, text: str) -> float:
        """Ensemble scoring: 60% RoBERTa + 40% VADER."""
        if not text or text.strip() == "":
            return 0.0
        roberta_score = self._get_roberta_polarity(text)
        vader_score = self._get_vader_polarity(text)
        return float(0.6 * roberta_score + 0.4 * vader_score)

    @staticmethod
    def categorize_user(avg_polarity: float, neg_ratio: float, thanks_ratio: float) -> str:
        """Categorizes users based on sentiment metrics."""
        if neg_ratio >= 0.60 or avg_polarity <= -0.35:
            return "Haters"
        elif thanks_ratio >= 0.50 or avg_polarity >= 0.35:
            return "Supporters"
        else:
            return "Neutrals"