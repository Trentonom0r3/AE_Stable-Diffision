import requests
import json
import os

url = 'http://127.0.0.1:7860/sdapi/v1/sd-models'
response = requests.get(url)

data = response.json()
print("JSON data:", json.dumps(data, indent=2))

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, 'output_data.json')

# Save the data to the output file in the script's directory
with open(output_path, 'w') as outfile:
    json.dump(data, outfile)
