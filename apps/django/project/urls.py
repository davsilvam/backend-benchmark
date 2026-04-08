from django.urls import include, path

urlpatterns = [
    path("api/", include("benchmark_api.urls")),
]
