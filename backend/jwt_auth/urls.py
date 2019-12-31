from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import RegisterUserView, CurrentUserView


urlpatterns = [
    path('token/', obtain_jwt_token),
    path('refresh/', refresh_jwt_token),
    path('register/', RegisterUserView.as_view()),
    path('current_user/', CurrentUserView.as_view())
]
