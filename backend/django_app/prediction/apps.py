from django.apps import AppConfig
import pandas as pd
from joblib import load
import os


class PredictionConfig(AppConfig):
    name = 'prediction'
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DATA_FILE = os.path.join(BASE_DIR,'prediction/Data/book_summaries1.csv')
    RECOMMENDATION_ENGINE_FILE = os.path.join(BASE_DIR,'prediction/mlmodel/SVD.joblib')
    Recommendation_Engine = load(RECOMMENDATION_ENGINE_FILE)

