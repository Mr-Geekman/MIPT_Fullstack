from rest_framework import serializers
from rest_framework import permissions

from .models import Map, MapMark, Profile


class MapMarkSerializer(serializers.ModelSerializer):
    """Сериализатор метки на карте."""
    class Meta:
        model = MapMark
        exclude = ['map']


class MapMarkCutSerializer(serializers.ModelSerializer):
    """Упрощенный сериализатор метки на карте (только ее id)."""
    class Meta:
        model = MapMark
        fields = ['id']


class MapSerializer(serializers.ModelSerializer):
    """Сериализатор карты."""
    marks = MapMarkSerializer(many=True)

    class Meta:
        model = Map
        fields = '__all__'


# TODO: api для получения текущего пользователя и просмотренных им меток
# TODO: api для обозначения метки, как просмотренной пользователем
class ProfileSerializer(serializers.ModelSerializer):
    """Сериализоатор профиля пользователя."""
    watched_marks = MapMarkCutSerializer(many=True)
    permission_classes = (permissions.IsAuthenticated,)

    class Meta:
        model = Profile
        fields = '__all__'
