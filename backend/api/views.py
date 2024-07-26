import pymongo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from pathlib import Path
import torch
from diffusers import StableDiffusionPipeline
from transformers import pipeline, set_seed
from PIL import Image

import os
from django.conf import settings

from pymongo import MongoClient
from bson.binary import Binary
import io
from bson.objectid import ObjectId
from django.http import HttpResponse

client = pymongo.MongoClient(os.getenv('DATABASE_URL'))
db = client['Image_DataBase']
collection = db['generated_images']


class CFG:
    def __init__(self):
        self.seed = 42
        self.device = torch.device("cpu")
        self.generator = torch.Generator(device=self.device).manual_seed(self.seed)
        self.image_gen_steps = 25
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
    config.image_gen_model_id,
    torch_dtype=torch.float32,
    revision="fp32",
    use_auth_token = os.environ.get('HUGGINGFACE_TOKEN'),
    guidance_scale=config.image_gen_guidance_scale, generator=config.generator
    )
image_gen_model = image_gen_model.to(config.device)


def generate_image(prompt, model):
    image = model(
        prompt,
        num_inference_steps=config.image_gen_steps,
        generator=config.generator,
        guidance_scale=config.image_gen_guidance_scale
    ).images[0]


    image = image.resize(config.image_gen_size)

    
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()

    image_id = collection.insert_one({
        'prompt': prompt,
        'image': Binary(img_byte_arr)
    }).inserted_id

    return str(image_id)



#serializer 
class ImageGenerationSerializer(serializers.Serializer):
    text_prompt = serializers.CharField(max_length=200)

    def create(self, validated_data):
        text_prompt = validated_data.get('text_prompt')
        image_id = generate_image(text_prompt, image_gen_model)

        return {'image_id': image_id}
    

class GenerateImageView(APIView):
    def post(self,request,*args,**kwargs):
        serializer = ImageGenerationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                result = serializer.create(serializer.validated_data)
                print(result)
                if result.get('image_id'):
                    return Response(result,status=200)
                else:
                    return Response({"error":"Image path could not be generated."},status=400)
            except Exception as e:
                return Response({"error":str(e)},status=400)
        return Response(serializer.errors,status=400)
    
    
class RetrieveImageView(APIView):
    def get(self, request, image_id):
        try:
            image_data = collection.find_one({'_id': ObjectId(image_id)})
            if image_data:
                return HttpResponse(image_data['image'], content_type='image/png')
            else:
                return Response({"error": "Image not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
            
