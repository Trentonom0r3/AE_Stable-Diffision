import asyncio
import base64
import glob
import json
import os
from PIL import Image
import httpx

standard_url = "http://127.0.0.1:7860/sdapi/v1/img2img"
controlnet_url = "http://127.0.0.1:7860/controlnet/img2img"

def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise ValueError('Boolean value expected.')
def get_image_paths(directory):
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif')
    return [os.path.join(directory, f) for f in os.listdir(directory) if f.lower().endswith(image_extensions)]

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return encoded_string   
        
async def img2imgmain(payload=None):
    # Load and encode the image
    image_path = payload.pop("image_path", None)
    if image_path is not None:
        encoded_image = encode_image(image_path)
    else:
        encoded_image = None
    
    if payload is None:
        payload = {}
        # Extract the parameters that are not sent to the API  
    controlnet_on = payload.pop("controlnet_on", False)
    process_type = payload.pop("process_type", False)
    
    if not controlnet_on:
        # Update payload with new values
        payload.update({
            'mode': payload.get('mode', 4),
            'prompt': payload.get('prompt', "A Dog"),
            'negative_prompt': payload.get('negative_prompt', "A Cat"),
            'seed': payload.get('seed', -1),
            'batch_size': payload.get('batch_size', 1),
            'steps': payload.get('steps', 20),
            'cfg_scale': payload.get('cfg_scale', 10),
            'restore_faces': payload.get('restore_faces', False),
            'denoising_strength': payload.get('denoising_strength', 0.4),
            'width': payload.get('width', 512),
            'height': payload.get('height', 512),
            'inpainting_fill': payload.get('inpainting_fill', 1),
        })
    else:
        # Update payload with new values
        payload.update({
            'mode': payload.get('mode', 4),
            'prompt': payload.get('prompt', "A Dog"),
            'negative_prompt': payload.get('negative_prompt', "A Cat"),
            'seed': payload.get('seed', -1),
            'batch_size': payload.get('batch_size', 1),
            'steps': payload.get('steps', 20),
            'cfg_scale': payload.get('cfg_scale', 10),
            'restore_faces': payload.get('restore_faces', False),
            'denoising_strength': payload.get('denoising_strength', 0.4),
            'width': payload.get('width', 512),
            'height': payload.get('height', 512),
            'inpainting_fill': payload.get('inpainting_fill', 1),
            "alwayson_scripts": {
              "controlnet": {
                  "args": [
                      {           
                          'module': payload.get('module', 'depth'),
                          'model': payload.get('model', 'control_depth-fp16 [400750f6]'),
                          'weight': payload.get('weight', 1),
                          'resize_mode': payload.get('resize_mode', 1),
                          'low_vram': payload.get('low_vram', False),
                          'processor_res': payload.get('processor_res', 384),
                          'guidance_start': payload.get('guidance_start', 0),
                          'guidance_end': payload.get('guidance_end', 1),
                          'guess_mode': payload.get('guess_mode', False),
                          
                      }
                    ],
                    "input_image": encoded_image,
                  }
                }
              })
    # Set controlnet_on flag
    payload["controlnet_on"] = controlnet_on

    # Get the most recent input folder
    input_folders = glob.glob(os.path.join(os.path.dirname(__file__), '..', 'Inputs', '*'))
    input_folder = max(input_folders, key=os.path.getctime)

    # Get the most recent inpaint folder
    inpaint_folders = glob.glob(os.path.join(os.path.dirname(__file__), '..', 'Inpaint', '*'))
    inpaint_folder = max(inpaint_folders, key=os.path.getctime)

    # Set the img2img_batch_input_dir and img2img_batch_inpaint_mask_dir arguments to the most recent input and inpaint folders
    img2img_batch_input_dir = input_folder
    img2img_batch_inpaint_mask_dir = inpaint_folder
    
    # Get image paths for input and inpaint masks
    input_image_paths = get_image_paths(img2img_batch_input_dir)
    inpaint_image_paths = get_image_paths(img2img_batch_inpaint_mask_dir)
    pathSize = min(len(input_image_paths), len(inpaint_image_paths))

    img2img_batch_output_dir = os.path.join(os.path.dirname(__file__), '..', 'Outputs')
    print(payload)

    # Create a new output folder within the output directory
    output_session_folder = os.path.join(img2img_batch_output_dir, f"output_session_{len(os.listdir(img2img_batch_output_dir))}")
    if not os.path.exists(output_session_folder):
        os.makedirs(output_session_folder)

    # Encode and send each image to the API call one at a time
    if process_type:
        for i in range(pathSize):
            # Encode images from img2img_batch_input_dir
            encoded_input_images = [encode_image(input_image_paths[i])]
            # Encode images from img2img_batch_inpaint_mask_dir
            encoded_inpaint_images = [encode_image(inpaint_image_paths[i])]

            payload["init_images"] = encoded_input_images
            payload["mask"] = encoded_inpaint_images[0]

            # Send the image to the API call
            result_images, info = await img2img_request(payload)

            # Create a dictionary to store image information
            image_info = {}

            # Store seed in the dictionary
            image_info["seed"] = info["seed"]

            # Set the output file name to include the image index and the seed value
            for k, result_image in enumerate(result_images):
                output_file_path = os.path.join(output_session_folder, f"output_seed_{info['seed']}_index_{k + (i * len(result_images))}.png")
                with open(output_file_path, "wb") as output_file:
                    # Write the result image to the output file
                    output_file.write(result_image)

    else:
        # If process_type is False, then just process the first image in the folders
        encoded_input_images = [encode_image(input_image_paths[0])]
        encoded_inpaint_images = [encode_image(inpaint_image_paths[0])]

        payload["init_images"] = encoded_input_images
        payload["mask"] = encoded_inpaint_images[0]

        # Send the image to the API call
        result_images, info = await img2img_request(payload, controlnet_on=controlnet_on)

        # Create a dictionary to store image information
        image_info = {}

        # Store seed in the dictionary
        image_info["seed"] = info["seed"]

        # Set the output file name to include the image index and the seed value
        for k, result_image in enumerate(result_images):
            output_file_path = os.path.join(output_session_folder, f"output_seed_{info['seed']}_index_{k}.png")
            with open(output_file_path, "wb") as output_file:
                # Write the result image to the output file
                output_file.write(result_image)

async def img2img_request(payload, controlnet_on=False):
    print("img2ImgHandle received payload:", payload)

    # Extract the parameters that are not sent to the API
    controlnet_on = payload.pop("controlnet_on", True)
    process_type = payload.pop("process_type", False)

    async with httpx.AsyncClient(timeout=None) as client:
        url = standard_url

        try:
            response = await client.post(url, json=payload)

            if response.status_code != 200:
                print(f"Error processing image: {response.status_code}, {response.text}")
                response.raise_for_status()

            result = response.json()
            result_images = [base64.b64decode(img) for img in result["images"]]
            info = json.loads(result["info"])

            return result_images, info

        except Exception as e:
            print(f"Error processing image: {e}")
            raise e

        finally:
            await client.aclose()


if __name__ == "__main__":
    asyncio.run(img2imgmain())