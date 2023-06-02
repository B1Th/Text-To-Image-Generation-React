from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers


from pathlib import Path
import torch
import pandas as pd
import numpy as np
from diffusers import StableDiffusionPipeline
from transformers import pipeline, set_seed
import matplotlib.pyplot as plt

import io 
import base64
from PIL import Image

import os
from django.conf import settings

class CFG:
    def __init__(self):
        self.device = "cpu"
        self.seed = 42
        self.generator = torch.Generator(
            torch.device("cpu")).manual_seed(self.seed)
        self.image_gen_steps = 15
        self.image_gen_model_id = "stabilityai/stable-diffusion-2"
        self.image_gen_size = (400, 400)
        self.image_gen_guidance_scale = 9
        self.prompt_gen_model_id = "gpt2"
        self.prompt_dataset_size = 6
        self.prompt_max_length = 12


# Create an instance of the CFG class
config = CFG()

# Create the image_gen_model using the config object
image_gen_model = StableDiffusionPipeline.from_pretrained(
    config.image_gen_model_id, torch_dtype=torch.float32,
    revision="fp16", use_auth_token='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',
    guidance_scale=config.image_gen_guidance_scale, generator=config.generator
)
image_gen_model = image_gen_model.to(config.device)


def generate_image(prompt, model):
    image = model(
        prompt, num_inference_steps=config.image_gen_steps,
        generator=config.generator,
        guidance_scale=config.image_gen_guidance_scale
    ).images[0]

    image = image.resize(config.image_gen_size)
    #save the image
    filename = f"{prompt.replace(' ','_')}.jpg"
    image_folder_path = os.path.join(settings.MEDIA_ROOT,'generated_images')
    os.makedirs(image_folder_path,exist_ok=True)
    image_file_path= os.path.join(image_folder_path,filename)
    image.save(image_file_path)
    print(image_file_path)
    
    return os.path.join('generated_images',filename)

#serializer 
class ImageGenerationSerializer(serializers.Serializer):
    text_prompt = serializers.CharField(max_length=200)

    def create(self,validated_data):
        text_prompt = validated_data.get('text_prompt')
        image_path = generate_image(text_prompt,image_gen_model)
        #image to byte arry
        # image_bytes = io.BytesIO()
        # image.save(image_bytes,format='JPEG',quality=50)
        #convert to base64
        # base64_image = base64.b64encode(image_bytes.getvalue()).decode('utf-8')

        return {'image':image_path}
    

class GenerateImageView(APIView):
    def post(self,request,*args,**kwargs):
        serializer = ImageGenerationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                result = serializer.create(serializer.validated_data)
                print(result)
                return Response(result,status=200)
            except Exception as e:
                return Response({"error":str(e)},status=400)
        return Response(serializer.errors,status=400)
            