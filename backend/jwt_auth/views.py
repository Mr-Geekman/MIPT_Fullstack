from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework import permissions

from .serializers import NewUserSerializer, CurrentUserSerializer


class RegisterUserView(CreateAPIView):
    """Контроллер регистрации."""
    model = User
    serializer_class = NewUserSerializer


class CurrentUserView(APIView):
    """Контроллер работы с текущим пользователем."""
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)
