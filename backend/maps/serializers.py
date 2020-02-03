from rest_framework import serializers
from rest_framework import permissions

from .models import Map, MapMark, Profile, Audio, MapDescriptionItem, MarkDescriptionItem


class MarkDescriptionItemSerializer(serializers.ModelSerializer):
    """Сериализатор фрагмента описания метки"""
    class Meta:
        model = MarkDescriptionItem
        exclude = ['mark']

class MapMarkSerializer(serializers.ModelSerializer):
    """Сериализатор метки на карте."""
    mark_description_items = MarkDescriptionItemSerializer(many=True)

    class Meta:
        model = MapMark
        exclude = ['map']


class MapDescriptionItemSerializer(serializers.ModelSerializer):
    """Сериализатор фрагмента описания"""
    class Meta:
        model = MapDescriptionItem
        exclude = ['map']


class MapMarkCutSerializer(serializers.ModelSerializer):
    """Упрощенный сериализатор метки на карте (только ее id)."""
    class Meta:
        model = MapMark
        fields = ['id']


class MapSerializer(serializers.ModelSerializer):
    """Сериализатор карты."""
    marks = MapMarkSerializer(many=True)
    map_description_items = MapDescriptionItemSerializer(many=True)

    class Meta:
        model = Map
        fields = '__all__'
        depth = 1

class MapCutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = ['url', 'title', 'description', 'thumbnail']


# TODO: api для получения текущего пользователя и просмотренных им меток
# TODO: api для обозначения метки, как просмотренной пользователем
class ProfileSerializer(serializers.ModelSerializer):
    """Сериализоатор профиля пользователя."""
    watched_marks = MapMarkCutSerializer(many=True)

    class Meta:
        model = Profile
        fields = ['watched_marks']
