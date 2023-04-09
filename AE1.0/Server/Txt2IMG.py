import argparse
import requests
import base64
import os
import sys
import json

parser = argparse.ArgumentParser()
parser.add_argument("prompt")
parser.add_argument("seed", type=int)
parser.add_argument("batch_size", type=int)
parser.add_argument("steps", type=int)
parser.add_argument("cfg_scale", type=int)
parser.add_argument("restore_faces", type=bool)
parser.add_argument("negative_prompt")

args = parser.parse_args()

url = "http://127.0.0.1:7860/sdapi/v1/txt2img"

data = {
  "prompt": args.prompt,
  "seed": args.seed,
  "batch_size": args.batch_size,
  "steps": args.steps,
  "cfg_scale": args.cfg_scale,
  "width": 512,
  "height": 512,
  "restore_faces": args.restore_faces,
  "negative_prompt": args.negative_prompt,
}

response = requests.post(url, json=data, timeout=None)
print(f"Processing prompt:")
print(response)

if response.status_code != 200:
    print("Error:", response.status_code, response.text)
    response.raise_for_status()

if response.status_code == 200:
    result = response.json()
    result_image = base64.b64decode(result["images"][0])

    # Create the outputs folder if it doesn't exist
    outputs_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Outputs')
    if not os.path.exists(outputs_folder):
        os.makedirs(outputs_folder)

    # Save the image to the Outputs folder
    output_file_path = os.path.join(outputs_folder, "output.png")
    with open(output_file_path, "wb") as output_file:
        output_file.write(result_image)

if __name__ == "__main__":
    temp_file_path = sys.argv[1]
    if os.path.isfile(temp_file_path):
        os.remove(temp_file_path)
