from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from .views import RegisterView, CurrentUserView


urlpatterns = [
    path('token/', obtain_jwt_token),
    path('register/', RegisterView.as_view()),
    path('current_user/', CurrentUserView.as_view())
]
