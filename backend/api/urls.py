from django.urls import path 
from .views import GenerateImageView, RetrieveImageView

urlpatterns = [
    path("predict/",GenerateImageView.as_view()),
    path("image/<str:image_id>/", RetrieveImageView.as_view()),
]