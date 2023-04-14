import requests
import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("modelname")
args = parser.parse_args()
url = "http://127.0.0.1:7860"

option_payload = {
    "sd_model_checkpoint": args.modelname,
}

response = requests.post(url=f'{url}/sdapi/v1/options', json=option_payload)