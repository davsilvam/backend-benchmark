from django.urls import path

from . import views

urlpatterns = [
    path("health", views.health),
    path("compute", views.compute),
    path("users", views.users),
    path("users/raw", views.users_raw),
]
