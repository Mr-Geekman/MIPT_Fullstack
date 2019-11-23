from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

from .views import LoginView, RegisterView


urlpatterns = [
    path('jwt', obtain_jwt_token),
    path('jwt-refresh', refresh_jwt_token),
    path('jwt-verify', verify_jwt_token),
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view())
]
