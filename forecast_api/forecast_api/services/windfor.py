import pandas as pd
from .http_client import bmrs_client
from ..literals import ENDPOINTS, ServiceDescriptors, OperationDescriptors, Errors
from datetime import timedelta
from forecast_api.services.server_timing import timed

def fetch_windfor(start, end, horizon_hours=4):

    try: 
        start = pd.to_datetime(start, utc=True)
        end = pd.to_datetime(end, utc=True)
        publish_from = (start - timedelta(hours=horizon_hours)).normalize()

        params = {
            "publishDateTimeFrom": publish_from,
            "publishDateTimeTo": end
        }

        with timed(ServiceDescriptors.EXTERNAL_API, OperationDescriptors.EXTERNAL_REQUEST):
            data = bmrs_client.get(ENDPOINTS.WINDFOR, params=params)

            
        with timed(ServiceDescriptors.PROCESS, OperationDescriptors.DATA_TRANSFORM):
            df = pd.DataFrame(data)

            if df.empty:
                return df

            df["startTime"] = pd.to_datetime(df["startTime"], utc=True, errors="coerce")
            df["publishTime"] = pd.to_datetime(df["publishTime"], utc=True, errors="coerce")

            df = df[
                (df["startTime"] >= start) &
                (df["startTime"] <= end)
            ]

        return df

    except Exception as e:
        raise APIException(Errors.EXTERNAL_API_FAILURE)