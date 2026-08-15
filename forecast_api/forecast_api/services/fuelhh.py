import pandas as pd
from .http_client import bmrs_client
from ..literals import ENDPOINTS, ServiceDescriptors, OperationDescriptors, Errors
from forecast_api.services.server_timing import timed
from rest_framework.exceptions import APIException

def fetch_fuelhh(start, end, fuel_type="WIND"):
    """
    Fetch FUELHH actual generation data between start and end.
    """
    try: 
        params = {
            "settlementDateFrom": start.date(),
            "settlementDateTo": end.date(),
            "fuelType": fuel_type
        }

        with timed(ServiceDescriptors.EXTERNAL_API, OperationDescriptors.EXTERNAL_REQUEST):
            data = bmrs_client.get(ENDPOINTS.FUELHH, params=params)


        with timed(ServiceDescriptors.PROCESS, OperationDescriptors.DATA_TRANSFORM):
            df = pd.DataFrame(data)
            df["startTime"] = pd.to_datetime(df["startTime"])
            df = df[(df["startTime"] >= start) & (df["startTime"] <= end)]

        return df

    except Exception as e:
        print(e)
        raise APIException(Errors.EXTERNAL_API_FAILURE)