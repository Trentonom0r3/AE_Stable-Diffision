
import json
import requests
import io
import base64
from PIL import Image, PngImagePlugin
import asyncio
import httpx

import socket
import argparse
import traceback
import sys
import os
import time
import serverHelper
import prompt_shortcut
import metadata_to_json
import search
import glob
sd_url = os.environ.get('SD_URL', 'http://127.0.0.1:7860')


websocket_data = {}

async def txt2ImgRequest(payload):
    try:
        # payload = { 
            #     "prompt": "cute cat, kitten",
            #     "steps": 10
            # }
        print("payload: ",payload)
        url = "http://127.0.0.1:7860/sdapi/v1/txt2img"
        
        img2img_batch_output_dir = os.path.join(os.path.dirname(__file__), '..', 'Outputs')
        output_session_folder = os.path.join(img2img_batch_output_dir, f"output_session_{len(os.listdir(img2img_batch_output_dir))}")
        if not os.path.exists(output_session_folder):
            os.makedirs(output_session_folder)
            
        # Update payload with default values if the keys are not present
        payload.setdefault('prompt', "A Dog")
        payload.setdefault('negative_prompt', "A Cat")
        payload.setdefault('seed', -1)
        payload.setdefault('batch_size', 1)
        payload.setdefault('steps', 20)
        payload.setdefault('cfg_scale', 10)
        payload.setdefault('restore_faces', False)
        payload.setdefault('width', 512)
        payload.setdefault('height', 512)

               
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout = None)
        
        if response.status_code != 200:
            print(f"Error processing image: {response.status_code}, {response.text}")
            response.raise_for_status()

        result = response.json()
        result_images = [base64.b64decode(img) for img in result["images"]]
        # Save the first image in the result_images list
        result_image = result_images[0]

        info = json.loads(result["info"].replace("'", "\""))

        # Set the output file name to include the seed value
        output_file_path = os.path.join(output_session_folder, f"output_seed_{info['seed']}.png")

        
        print(f"Output file path: {output_file_path}")
        print(f"Result image length: {len(result_image)}")
        
        # Write the result image to the output file
        with open(output_file_path, "wb") as output_file:
            output_file.write(result_image)
        return result_images, info
    
    except Exception as e:
        print("An error occurred:")
        print(traceback.format_exc())
        raise e      
                    
if __name__ == "__txt2ImgRequest__":
    asyncio.run(txt2ImgRequest())                
                
import base64
from io import BytesIO


def img_2_b64(image):
    buff = BytesIO()
    image.save(buff, format="PNG")
    img_byte = base64.b64encode(buff.getvalue())
    img_str = img_byte.decode("utf-8")
    return img_str


from typing import Union

from fastapi import FastAPI
from fastapi import APIRouter, Request



router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.get("/version")
def getVersion():
    manifest_dir = "..\..\manifest.json"
    
    manifest = {'version': '0.0.0'}
    version = "0.0.0"
    try:

        with open(manifest_dir, 'r') as f:
            manifest = json.load(f)
            version = manifest['version']
    except:
        print("couldn't read the manifest.json")
    return {"version": f"v{version}"}






# @router.post("/txt2img/")
# async def txt2ImgHandle(payload:Payload):
#     print("txt2ImgHandle: \n")
#     txt2ImgRequest(payload)
#     return {"prompt":payload.prompt,"images": ""}


from fastapi import Request, Response
import img2imgapi






@router.post("/sd_url/")
async def changeSdUrl(request:Request):
    global sd_url
    try:

        payload = await request.json()
        print("changeSdUrl: payload:",payload)
        print(f"change sd url from {sd_url} to {payload['sd_url']} \n")
        sd_url = payload['sd_url']
    except:
        print("error occurred in changeSdUrl()")
        #  response.body = resp.content
        # return {}
    return {"sd_url":sd_url}









@router.post("/txt2img/")
async def txt2ImgHandle(request: Request):
    print("txt2ImgHandle: \n")
    payload = request
    print("payload:", payload)
    result = await txt2ImgRequest(payload)
    result_images, info = result["result_images"], result["info"]
    response = {"payload": payload, "result_images": result_images, "info": info}
    print("response:", response)
    return response

from img2imgapi import img2imgmain  # Assuming you have saved the main script in a file named `your_script.py`

@router.post("/img2img/")
async def img2ImgHandle(request):
    print("img2ImgHandle: \n")
    payload = request
    print("payload:", payload)
    result = await img2imgmain(payload)
    result_images, info = result["result_images"], result["info"]
    response = {"payload": payload, "result_images": result_images, "info": info}
    print("response:", response)
    return response




@router.post("/getInitImage/")
async def getInitImageHandle(request:Request):
    print("getInitImageHandle: \n")
    payload = await request.json() 
    print("payload:",payload)
    init_img_dir = "./init_images"
    init_img_name = payload["init_image_name"]# change this to "image_name"
    
    numOfAttempts = 3
    init_img_str = ""
    for i in range(numOfAttempts):
        try:
            image_path = f"{init_img_dir}/{init_img_name}"
            init_img = Image.open(image_path)
            init_img_str = img_2_b64(init_img)

            
            # # If file exists, delete it.
            # if os.path.isfile(image_path):
            #     os.remove(image_path)
        except:
            print(f"exception:fail to read an image file {image_path}, will try again {i} of {numOfAttempts}")
            #sleep for one second every time you try to read an image and fail
            time.sleep(1)
            continue;
    
    
    
    return {"payload": payload,"init_image_str":init_img_str}

@router.get('/config')
async def sdapi(request: Request, response: Response):
    try:
        
        resp = requests.get(url=f'{sd_url}/config', params=request.query_params)
        response.status_code = resp.status_code
        response.body = resp.content
    except:
        print(f'exception: fail to send request to {sd_url}/config')
        print(f'{request}')
    return response

@router.get('/sdapi/v1/{path:path}')
async def sdapi(path: str, request: Request, response: Response):
    try:
        
        resp = requests.get(url=f'{sd_url}/sdapi/v1/{path}', params=request.query_params)
        response.status_code = resp.status_code
        response.body = resp.content
    except:
        print(f'exception: fail to send request to {sd_url}/sdapi/v1/{path}')
        print(f'{request}')
    return response

@router.post('/sdapi/v1/{path:path}')
async def sdapi(path: str, request: Request, response: Response):
    try:
        json = await request.json()
    except: 
        json = {}

    try:
        # if(path =="interrupt"):
        #     resp = requests.post(url=f'{sd_url}/sdapi/v1/{path}', params=request.query_params)

        # else:
        #     resp = requests.post(url=f'{sd_url}/sdapi/v1/{path}', params=request.query_params, json=await request.json())
        resp = requests.post(url=f'{sd_url}/sdapi/v1/{path}', params=request.query_params, json=json)

        response.status_code = resp.status_code
        response.body = resp.content
    except:
        print(f'exception: fail to send request to {sd_url}/sdapi/v1/{path}')
        print(f'{request}')
    return response



# async def base64ToPng(base64_image,image_path):
#     base64_img_bytes = base64_image.encode('utf-8')
#     with open(image_path, 'wb') as file_to_save:
#         decoded_image_data = base64.decodebytes(base64_img_bytes)
#         file_to_save.write(decoded_image_data)


@router.post('/save/png/')
async def savePng(request:Request):
    print("savePng()")
    try:
        json = await request.json()
        
    except: 
        json = {}
    
    print("json:",json)
    try:
        folder = './init_images'
        image_path = f"{folder}/{json['image_name']}"
        await img2imgapi.base64ToPng(json['base64'],image_path)
        
        
        
        
        return {"status":f"{json['image_name']} has been saved"}
    except:
        print(f'{request}')
    return {"error": "error message: could not save the image file"}


@router.post('/search/image/')
async def searchImage(request:Request):
    try:
        json = await request.json()
    except: 
        json = {}
    

    try:
        keywords = json.get('keywords','cute dogs') 
        images = await search.imageSearch(keywords)
        print(images)
        
        
        return {"images":images}
    except:
        print("keywords",keywords)
        # print(f'{request}')
    return {"error": "error message: can't preform an image search"}

@router.post('/mask/expansion/')
async def maskExpansionHandler(request:Request):
    try:
        json = await request.json()
    except: 
        json = {}
    

    try:
        # keywords = json.get('keywords','cute dogs') 
        base64_mask_image = json['mask']
        mask_expansion = json['mask_expansion']
        #convert base64 to img
        
        await img2imgapi.base64ToPng(base64_mask_image,"original_mask.png")#save a copy of the mask for debugging

        mask_image = img2imgapi.b64_2_img(base64_mask_image)
        
        expanded_mask_img = img2imgapi.maskExpansion(mask_image,mask_expansion)
        base64_expanded_mask_image = img2imgapi.img_2_b64(expanded_mask_img)
        await img2imgapi.base64ToPng(base64_expanded_mask_image,"expanded_mask.png")#save a copy of the mask of the expanded_mask for debugging

        print("successful mask expansion operation")
        return {"mask":base64_expanded_mask_image}
    
    except:
        print("request",request)
        raise Exception(f"couldn't preform mask expansion")
    # return response
    return {"error": "error message: can't preform an mask expansion"}


@router.post('/history/load')
async def loadHistory(request: Request):
    # {'image_paths','metadata_setting'}
    history = {}
    try:
        json = await request.json()
    except: 
        json = {}

    try:

        uniqueDocumentId = json['uniqueDocumentId']
        
        import glob

        image_paths = glob.glob(f'./output/{uniqueDocumentId}/*.png')
        settings_paths = glob.glob(f'./output/{uniqueDocumentId}/*.json')#note: why is we are not using settings_paths?
        print("loadHistory: image_paths:", image_paths)
        

        history['image_paths'] = image_paths
        history['metadata_jsons'] = []
        history['base64_images'] = []
        for image_path in image_paths:
            print("image_path: ", image_path)
            metadata_dict = metadata_to_json.createMetadataJsonFileIfNotExist(image_path)
            history['metadata_jsons'].routerend(metadata_dict)
            
            
            img = Image.open(image_path)
            base64_image = img_2_b64(img)
            history['base64_images'].routerend(base64_image)

    except:
        
        print(f'{request}')
    
    #reverse the order so that newer generated images path will be shown first
    

    history['image_paths'].reverse()
    history['metadata_jsons'].reverse()
    history['base64_images'].reverse()    
    return {"image_paths":history['image_paths'], "metadata_jsons":history['metadata_jsons'],"base64_images": history['base64_images']}


@router.post('/prompt_shortcut/load')
async def loadPromptShortcut(request: Request):
    prompt_shortcut_json = {}
    try:
        json = await request.json()
    except: 
        json = {}

    try:

        prompt_shortcut_json = prompt_shortcut.load()
        # response.body = {"prompt_shortcut":prompt_shortcut}
        # response.status_code = 200
    except:
        # print(f'exception: fail to send request to {sd_url}/sdapi/v1/{path}')
        print(f'{request}')
        
    # return response
    return {"prompt_shortcut":prompt_shortcut_json}
@router.post('/prompt_shortcut/save')
async def loadPromptShortcut(request: Request):
    prompt_shortcut_json = {}
    try:
        json = await request.json()
    except: 
        json = {}

    try:
        print("json: ",json)
        print("json['prompt_shortcut']: ",json['prompt_shortcut'])
        # save the prompt shortcut to the prompt_shortcut.json
        prompt_shortcut_json = json['prompt_shortcut']
        # response.body = {"prompt_shortcut":prompt_shortcut}
        # response.body = {"prompt_shortcut":prompt_shortcut}
        prompt_shortcut.writeToJson("prompt_shortcut.json",prompt_shortcut_json)
    except:
        # print(f'exception: fail to send request to {sd_url}/sdapi/v1/{path}')
        print(f'error occurred durning reading the request {request}')
    # return response
    return {"prompt_shortcut":prompt_shortcut_json}

import requests

@router.post("/swapModel")
async def swapModel(payload):  # Changed the parameter name to 'payload'
    print("swapModel: \n")
    print("payload:", payload)
    model_title = payload['title']  # Changed the access method for 'title'
    option_payload = {
        # "sd_model_checkpoint": "Anything-V3.0-pruned.ckpt [2700c435]"
        "sd_model_checkpoint": model_title
    }
    response = requests.post(url=f'{sd_url}/sdapi/v1/options', json=option_payload)


@router.post("/get_sd_models")
async def get_sd_models(request: Request):
    response = requests.get(url=f'{sd_url}/sdapi/v1/sd-models')
    data = response.json()
    return data

@router.post("/controlnet/model_list")
async def controlnet_model(request: Request):
    response = requests.get(url=f'{sd_url}/controlnet/model_list')
    data = response.json()
    return data
    
@router.post("/controlnet/module_list")
async def controlnet_module(request: Request):
    response = requests.get(url=f'{sd_url}/controlnet/module_list')
    data = response.json()
    return data



app = FastAPI()

app.include_router(router)

async def handle_request(request):
    request_type = request.get("type")
    
    
    if request_type == "config":
        request_data = request.get("payload")
        response_data = await config(payload)
        return response_data
    elif request_type == "txt2img":
        request_data = request.get("payload")
        response_data = await txt2img(request_data)
        return response_data
    elif request_type == "change_sd_url":
        request_data = request.get("payload")
        response_data = await change_sd_url(request_data)
        return response_data
    elif request_type == "txt2ImgHandle":
        request_data = request.get("payload")
        response_data = await txt2ImgHandle(request_data)
        return response_data
    elif request_type == "img2img_handle":
        request_data = request.get("payload")
        response_data = await img2ImgHandle(request_data)
        return response_data
    elif request_type == "get_init_image_handle":
        request_data = request.get("data")
        response_data = await get_init_image_handle(request_data)
        return response_data
    elif request_type == "save_png":
        request_data = request.get("data")
        response_data = await save_png(request_data)
        return response_data
    elif request_type == "search_image":
        request_data = request.get("data")
        response_data = await search_image(request_data)
        return response_data
    elif request_type == "mask_expansion_handler":
        request_data = request.get("data")
        response_data = await mask_expansion_handler(request_data)
        return response_data
    elif request_type == "load_history":
        request_data = request.get("data")
        response_data = await load_history(request_data)
        return response_data
    elif request_type == "load_prompt_shortcut":
        request_data = request.get("data")
        response_data = await load_prompt_shortcut(request_data)
        return response_data
    elif request_type == "save_prompt_shortcut":
        request_data = request.get("data")
        response_data = await save_prompt_shortcut(request_data)
        return response_data
    elif request_type == "swap_model":
        print(f"Received swap_model request: {request}")
        request_data = request.get("payload")
        response_data = await swapModel(request_data)
        return response_data
    elif request_type == "get_sd_models":
        request_data = None  # Initialize request_data to None
        response_data = await get_sd_models(request_data)
        return response_data   
    elif request_type == "controlnet/model_list":
        request_data = None  # Initialize request_data to None
        response_data = await controlnet_model(request_data)
        return response_data  
    elif request_type == "controlnet/module_list":
        request_data = None  # Initialize request_data to None
        response_data = await controlnet_module(request_data)
        return response_data  
    else:
        return {"error": "Unknown request type"}


async def start_server(host, port):
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((host, port))
    server_socket.listen(1)

    print(f"Server listening on {host}:{port}")

    while True:
        connection, address = server_socket.accept()

        try:
            data = connection.recv(1024)
            if data:
                request = json.loads(data.decode("utf-8"))
                print(request)
                response_data = await handle_request(request)  # Await handle_request
                print(response_data)
                connection.sendall(json.dumps(response_data).encode("utf-8"))
        except Exception as e:
            print(f"An error occurred: {e}")  # Print the exception
        finally:
            connection.close()

if __name__ == "__main__":
    HOST, PORT = "127.0.0.1", 5000
    asyncio.run(start_server(HOST, PORT))  # Use asyncio.run to start the server

