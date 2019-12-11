from django.urls import path

from .views import LoginView, RegisterView, CurrentUserView


urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('current_user/', CurrentUserView.as_view())
]
