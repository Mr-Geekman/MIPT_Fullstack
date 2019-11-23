from rest_framework import serializers


class TokenSerializer(serializers.Serializer):
    """Сериализатор данных токена."""
    token = serializers.CharField(max_length=255)
