# This Flask app is an API that conducts sentiment analysis on any text string and returns
# a single sentiment score between -1 and 1. Please install all requirements mentioned in
# requirements.txt first.

import argparse
from google.cloud import language_v1
import os
from flask import Flask, request, jsonify

# Change environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of creds.json
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getcwd() + "/mentalhealth-hoohacks2021-60d1aa8fe6e9.json"

app = Flask(__name__)

# API that can be queried using a JSON POST request. JSON Structure should be:
#   {
#       "text" : "The text you want to analyse goes here."
#   }
# Try it with Postman!

def analyze(text):
    """Run a sentiment analysis request on text within a passed filename."""
    client = language_v1.LanguageServiceClient()
    content = text
    document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
    s_score = client.analyze_sentiment(document=document).document_sentiment.score
    print(s_score)
    return s_score

@app.route('/', methods = ['POST'])
def get_sentiment_score():
    # Get JSON data
    data = request.json
    text = data['text']
    # Get the sentiment score
    sentiment_score = analyze(text)
    # Sentiment Score returned as a JSON
    return jsonify(score=sentiment_score)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port = 80)