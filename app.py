from pathlib import Path
import torch
import pandas as pd
import numpy as np
from diffusers import StableDiffusionPipeline
from transformers import pipeline, set_seed
import matplotlib.pyplot as plt


class CFG:
    def __init__(self):
        self.device = "cpu"
        self.seed = 42
        self.generator = torch.Generator(
            torch.device("cpu")).manual_seed(self.seed)
        self.image_gen_steps = 1
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
    return image


generate_image("astronaut in space", image_gen_model)

