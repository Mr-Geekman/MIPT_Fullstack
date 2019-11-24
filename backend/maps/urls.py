from django.urls import path

from .views import ListMapsView, MapView

urlpatterns = [
    path('', ListMapsView.as_view()),
    path('<slug:slug>/', MapView.as_view())
]
