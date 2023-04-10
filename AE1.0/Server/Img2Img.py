import argparse
import requests
import base64
import os
import sys
import json
import glob
import os

url = "http://127.0.0.1:7860/sdapi/v1/img2img"

parser = argparse.ArgumentParser()
parser.add_argument("prompt")
parser.add_argument("seed", type=int)
parser.add_argument("batch_size", type=int)
parser.add_argument("steps", type=int)
parser.add_argument("cfg_scale", type=int)
parser.add_argument("restore_faces", type=bool)
parser.add_argument("negative_prompt")
parser.add_argument("--inpaint-dir", default="Inpaint")
parser.add_argument("--input-dir", default="Inputs")
parser.add_argument("--output-dir", default="Outputs")
parser.add_argument("denoising_strength")


args = parser.parse_args()

args.mode = "4"  
args.inpainting_fill = "1" 

# Get the most recent input folder
input_folders = glob.glob(os.path.join(os.path.dirname(__file__), '..', 'Inputs', '*'))
input_folder = max(input_folders, key=os.path.getctime)

# Get the most recent inpaint folder
inpaint_folders = glob.glob(os.path.join(os.path.dirname(__file__), '..', 'Inpaint', '*'))
inpaint_folder = max(inpaint_folders, key=os.path.getctime)

# Set the img2img_batch_input_dir and img2img_batch_inpaint_mask_dir arguments to the most recent input and inpaint folders
args.img2img_batch_input_dir = input_folder
args.img2img_batch_inpaint_mask_dir = inpaint_folder

def get_image_paths(directory):
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif')
    return [os.path.join(directory, f) for f in os.listdir(directory) if f.lower().endswith(image_extensions)]

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return encoded_string

# Get image paths for input and inpaint masks
input_image_paths = get_image_paths(args.img2img_batch_input_dir)
inpaint_image_paths = get_image_paths(args.img2img_batch_inpaint_mask_dir)

# Initialize list for encoded input images and inpaint masks
encoded_input_images = []
encoded_inpaint_images = []

# Encode images from img2img_batch_input_dir
for path in input_image_paths:
    encoded_input_images.append(encode_image(path))

# Encode images from img2img_batch_inpaint_mask_dir
for path in inpaint_image_paths:
    encoded_inpaint_images.append(encode_image(path))
print("Input image paths:", input_image_paths)

# 2 is latent noise, 3 is latent nothing, 1 is image

args.img2img_batch_output_dir = os.path.join(os.path.dirname(__file__), '..', 'Outputs')

# Create a new output folder within the output directory
output_session_folder = os.path.join(args.img2img_batch_output_dir, f"output_session_{len(os.listdir(args.img2img_batch_output_dir))}")
if not os.path.exists(output_session_folder):
    os.makedirs(output_session_folder)

for i, (encoded_init_image, encoded_inpaint_image) in enumerate(zip(encoded_input_images, encoded_inpaint_images)):
        # Prepare data for API call
    data = {
        "prompt": args.prompt,
        "seed": args.seed,
        "batch_size": args.batch_size,
        "steps": args.steps,
        "cfg_scale": args.cfg_scale,
        "restore_faces": args.restore_faces,
        "negative_prompt": args.negative_prompt,
        "init_images": [encoded_init_image],
        "mask": encoded_inpaint_image,
        "denoising_strength": args.denoising_strength,
        "mode": args.mode,
        "inpainting_fill": args.inpainting_fill,
        
        # Add missing parameters from the provided data dictionary
        "id_task": "task(na4872ukddopoz4)",
        "prompt_styles": [],
        "init_img": None,
        "sketch": None,
        "init_img_with_mask": None,
        "inpaint_color_sketch": None,
        "inpaint_color_sketch_orig": None,
        "mask_blur": 4,
        "mask_alpha": 0,
        "tiling": False,
        "n_iter": 1,
        "image_cfg_scale": 1.5,
        "subseed": -1.0,
        "subseed_strength": 0,
        "seed_resize_from_h": 0,
        "seed_resize_from_w": 0,
        "seed_enable_extras": False,
        "height": 512,
        "width": 512,
        "resize_mode": 0,
        "inpaint_full_res": 0,
        "inpaint_full_res_padding": 32,
        "inpainting_mask_invert": 0,

    }

    print(f"Processing input image {input_image_paths[i]} with inpaint mask {inpaint_image_paths[i]}")

    response = requests.post(url, json=data, timeout=None)

    if response.status_code != 200:
        print(f"Error processing image {i}: {response.status_code}, {response.text}")
        response.raise_for_status()

    result = response.json()
    result_images = [base64.b64decode(img) for img in result["images"]]

    for k, result_image in enumerate(result_images):
        output_file_path = os.path.join(output_session_folder, f"output_{i}_{k}.png")
        with open(output_file_path, "wb") as output_file:
            output_file.write(result_image)
        print(f"Output image {k} saved at: {output_file_path}")

    # If batch process, save the image to the input directory for the next iteration
    if args.batch_size > 1 and k < args.batch_size - 1:
        input_file_path = os.path.join(args.img2img_batch_input_dir, f"input_{i * args.batch_size + k + 1}.png")
        with open(input_file_path, "wb") as input_file:
            input_file.write(result_image)
        print(f"Input image {i * args.batch_size + k + 1} saved at: {input_file_path}")
