from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions

from .serializers import TokenSerializer


# Получаем настройки JWT
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class LoginView(APIView):
    """Контроллер для входа."""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # login saves the user’s ID in the session,
            # using Django’s session framework.
            login(request, user)
            serializer = TokenSerializer(data={
                # using drf jwt utility functions to generate a token
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )})
            serializer.is_valid()
            return Response(serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(APIView):
    """Контроллер регистрации."""
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        email = request.data.get('email', '')
        if not username and not password and not email:
            return Response(
                data={
                    'message': 'Для регистрации необходимо заполнить поля '
                               'username, password, email.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        new_user = User.objects.create_user(
            username=username, password=password, email=email
        )
        new_user.save()
        return Response(status=status.HTTP_201_CREATED)
