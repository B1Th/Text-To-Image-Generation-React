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


class CFG:
    seed = 42
    device = torch.device("cuda")
    generator = torch.Generator(device=device).manual_seed(seed)
    image_gen_steps = 50
    image_gen_model_id = "stabilityai/stable-diffusion-2"
    image_gen_size = (400, 400)
    image_gen_guidance_scale = 9
    prompt_gen_model_id = "gpt2"
    prompt_dataset_size = 6
    prompt_max_length = 12


# Create the image_gen_model
    image_gen_model = StableDiffusionPipeline.from_pretrained(
        image_gen_model_id,
        torch_dtype=torch.float16,
        revision="fp16",
        use_auth_token='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',
        guidance_scale=image_gen_guidance_scale
    )
    image_gen_model = image_gen_model.to(device)


def generate_image(prompt, model):
    image = model(
        prompt,
        num_inference_steps=CFG.image_gen_steps,
        generator=CFG.generator,
        guidance_scale=CFG.image_gen_guidance_scale
    ).images[0]


    image = image.resize(CFG.image_gen_size)
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
        image_path = generate_image(text_prompt,CFG.image_gen_model)

        return {'image':image_path}
    

class GenerateImageView(APIView):
    def post(self,request,*args,**kwargs):
        serializer = ImageGenerationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                result = serializer.create(serializer.validated_data)
                print(result)
                if result.get('image'):
                    return Response(result,status=200)
                else:
                    return Response({"error":"Image path could not be generated."},status=400)
            except Exception as e:
                return Response({"error":str(e)},status=400)
        return Response(serializer.errors,status=400)
            