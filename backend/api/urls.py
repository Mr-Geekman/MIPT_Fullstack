from django.urls import path

from .views import ListMapsView, MapView

urlpatterns = [
    path('maps/', ListMapsView.as_view()),
    path('map/<slug:slug>/', MapView.as_view())
]
