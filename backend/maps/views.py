from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Map
from .serializers import MapSerializer


# TODO: заменить на GenericView -- ListApiView
# Можно упростить : https://www.django-rest-framework.org/tutorial/3-class-based-views/
# ListApiView
class ListMapsView(APIView):
    """Контроллер для работы с несколькими картами"""
    def get(self, request):
        maps = Map.objects.all()
        serializer = MapSerializer(maps, many=True)
        return Response(serializer.data)


# TODO: заменить на GenericView -- RetrieveApiView
class MapView(APIView):
    """Контроллер для работы с одной картой."""
    def get(self, request, slug):
        try:
            found_map = Map.objects.get(url=slug)
        except Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = MapSerializer(found_map)
        return Response(serializer.data)


class ProfileView(APIView):
    """Контроллер для работы с профилем пользователя."""
    pass
