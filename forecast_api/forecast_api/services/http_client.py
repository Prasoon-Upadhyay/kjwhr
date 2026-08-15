import requests
from django.conf import settings
from forecast_api.settings import BMRS_BASE_URL

class HttpClient:
    def __init__(self, base_url=None):
        self.base_url = base_url

    def get(self, url, params=None):
        """
        Generic GET request.
        """
        full_url = f"{self.base_url}/{url}" if self.base_url else url

        response = requests.get(full_url, params=params)
        response.raise_for_status()
        return response.json()


bmrs_client = HttpClient(BMRS_BASE_URL)