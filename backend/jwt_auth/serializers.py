from django.contrib.auth.models import User
from rest_framework import serializers

from maps.serializers import ProfileSerializer
from maps.models import Profile
from rest_framework_jwt.settings import api_settings


class NewUserSerializer(serializers.ModelSerializer):
    """Сериализатор для нового пользователя."""
    token = serializers.SerializerMethodField()
    profile = ProfileSerializer(required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['token', 'username', 'email', 'password', 'profile']


    def get_token(self, obj):
        """Получение токена."""
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        """Создание нового пользователя пользователя."""
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        Profile.objects.create(user=user)
        return user


class CurrentUserSerializer(serializers.ModelSerializer):
    """Сериализатор уже существуюего пользователя."""
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'email', 'profile']
