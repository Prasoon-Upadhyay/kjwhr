from rest_framework import serializers


class WindForecastSerializer(serializers.Serializer):
    start = serializers.DateTimeField()
    end = serializers.DateTimeField()
    horizon = serializers.IntegerField(min_value=1, max_value=48)