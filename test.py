"""Demonstrates how to make a simple call to the Natural Language API."""

import argparse
from google.cloud import language_v1

def print_result(annotations):
    score = annotations.document_sentiment.score
    magnitude = annotations.document_sentiment.magnitude

    for index, sentence in enumerate(annotations.sentences):
        sentence_sentiment = sentence.sentiment.score
        print(
            "Sentence {} has a sentiment score of {}".format(index, sentence_sentiment)
        )

    print(
        "Overall Sentiment: score of {} with magnitude of {}".format(score, magnitude)
    )
    return 0



def analyze(fname):
    """Run a sentiment analysis request on text within a passed filename."""
    client = language_v1.LanguageServiceClient()
    file = open(fname, 'rt')
    text = file.read()
    file.close()
    content = text
    document = language_v1.Document(content=content, type_=language_v1.Document.Type.PLAIN_TEXT)
    s_score = client.analyze_sentiment(document=document).document_sentiment.score
    print(s_score)
    return s_score




if __name__ == "__main__":
    #nltk.download()
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "movie_review_filename",
        help="The filename of the movie review you'd like to analyze.",
    )
    args = parser.parse_args()

    analyze(args.movie_review_filename)