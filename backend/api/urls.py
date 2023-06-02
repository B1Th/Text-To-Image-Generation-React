from django.urls import path 
from .views import GenerateImageView

urlpatterns = [
    path("predict/",GenerateImageView.as_view()),
]