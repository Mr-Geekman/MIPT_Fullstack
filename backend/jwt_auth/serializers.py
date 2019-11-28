from django.contrib.auth.models import User
from rest_framework import serializers

from maps.serializers import ProfileSerializer


class TokenSerializer(serializers.Serializer):
    """Сериализатор данных токена."""
    token = serializers.CharField(max_length=255)


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор пользователя."""
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']
