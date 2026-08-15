from django.urls import path
from .views import wind_forecast_view

urlpatterns = [
    path("wind-forecast/", wind_forecast_view),
]