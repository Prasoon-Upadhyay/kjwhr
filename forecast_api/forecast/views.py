from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, ValidationError
from rest_framework import status
import pandas as pd
import numpy as np
from datetime import timedelta

from .serializers import WindForecastSerializer
from forecast_api.services.fuelhh import fetch_fuelhh
from forecast_api.services.windfor import fetch_windfor
from forecast_api.literals import ServiceDescriptors, OperationDescriptors, Errors
from forecast_api.services.server_timing import timed


class WindForecastAPIView(APIView):
    
    def process_data(self, fuel_df: pd.DataFrame, forecast_df: pd.DataFrame, horizon_hours: int):
        try: 
            horizon_td = timedelta(hours=horizon_hours)

            fuel_df = fuel_df.copy()
            forecast_df = forecast_df.copy()

            # Convert to DateTime for proper calcs
            fuel_df["startTime"] = pd.to_datetime(fuel_df["startTime"], utc=True)
            forecast_df["startTime"] = pd.to_datetime(forecast_df["startTime"], utc=True)
            forecast_df["publishTime"] = pd.to_datetime(forecast_df["publishTime"], utc=True)

            # Filter down to usable window of values 
            forecast_df["horizonDiff"] = forecast_df["startTime"] - forecast_df["publishTime"]
            forecast_df = forecast_df[forecast_df["horizonDiff"] >= horizon_td]
            forecast_df = forecast_df.sort_values(["startTime", "publishTime"])

            # For each startTime, we use the publishTime that is just below the Forecast Horizon
            forecast_max = forecast_df.groupby("startTime", as_index=False).tail(1)

            actual_df = fuel_df[["startTime", "generation"]].rename(
                columns={"generation": "actual"}
            )

            forecast_final_df = forecast_max[["startTime", "generation"]].rename(
                columns={"generation": "forecast"}
            )

            # Left-Join both DataFrames
            merged_df = pd.merge(
                actual_df,
                forecast_final_df,
                on="startTime",
                how="left"
            )

            merged_df = merged_df.sort_values("startTime")
            merged_df = merged_df.replace([np.inf, -np.inf], np.nan).where(pd.notnull(merged_df), None)

            return merged_df

        except Exception as e:
            raise APIException(f"{Errors.DATA_PROCESSING_FAILURE}: {str(e)}")

    def get(self, request):

        try:
            with timed(ServiceDescriptors.PROCESS, OperationDescriptors.REQUEST_PARSE):
                serializer = WindForecastSerializer(data=request.query_params)
                serializer.is_valid(raise_exception=True)
                data = serializer.validated_data

                start = pd.to_datetime(data["start"], utc=True)
                end = pd.to_datetime(data["end"], utc=True)
                horizon = data["horizon"]

            fuel_df = fetch_fuelhh(start, end, fuel_type="WIND")
            forecast_df = fetch_windfor(start, end, horizon_hours=horizon)

            with timed(ServiceDescriptors.COMPUTE, OperationDescriptors.DATA_TRANSFORM):
                final_df = self.process_data(fuel_df, forecast_df, horizon)
                final_df = final_df.replace([np.inf, -np.inf], np.nan)
                final_df = final_df.dropna(subset=["forecast"])
                final_df = final_df.astype(object).where(pd.notnull(final_df), None)

            with timed(ServiceDescriptors.PROCESS, OperationDescriptors.RESPONSE_SERIALIZE):
                result = final_df.to_dict(orient="records")

            return Response({"result": result}, status=status.HTTP_200_OK)

        except ValidationError:
            raise
        except APIException:
            raise
        except Exception:
            raise APIException(Errors.SOMETHING_WENT_WRONG)


wind_forecast_view = WindForecastAPIView.as_view()