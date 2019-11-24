import os

from django.db import models
from django.utils.deconstruct import deconstructible
from django.contrib.auth.models import User

import pytils


class MapMark(models.Model):
    """Модель метки на карте."""
    class Meta:
        db_table = "map_marks"
        verbose_name = "Метка на карте"
        verbose_name_plural = "Метки на карте"

    # содержание карты
    content = models.TextField('Контент')
    # ссылка на карту, к которой относится метка
    map = models.ForeignKey('Map', related_name='marks', blank=True,
                            on_delete=models.CASCADE)
    # радиус метки
    radius = models.PositiveIntegerField('Радиус метки', blank=False,
                                         help_text='В пикселях')
    # x-координата метки
    x_coordinate = models.PositiveIntegerField('x-координата метки',
                                               blank=False,
                                               help_text='В пикселях')
    # y-координата метки
    y_coordinate = models.PositiveIntegerField('y-координата метки',
                                               blank=False,
                                               help_text='В пикселях')

    def __str__(self):
        return '{}:{}'.format(self.id, self.map.title)


@deconstructible
class SaveMapImage:
    """Для сохранения изображения с названием, как url объекта."""
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        """Функция для upload_to thumbnail.
        :param instance: экземпляр класса, с которым работаем
        :param filename: имя загружаемой картинки
        :return: результирующий путь
        """
        # создаем путь и не забываем про расширение
        url = instance.url or pytils.translit.slugify(instance.title)
        return "{}.{}".format(os.path.join(self.path, url),
                              filename.split('.')[-1])


class Map(models.Model):
    """Модель карты."""
    class Meta:
        db_table = "maps"
        verbose_name = "Карта"
        verbose_name_plural = "Карты"

    # текстовый адрес карты (для хорошо интерпретируемых url)
    url = models.SlugField(
        'Адрес карты', max_length=100, unique=True, blank=True, null=True,
        help_text='Если не вводить, то сгенерируется автоматически'
    )
    # название карты
    title = models.CharField('Название карты', max_length=255, blank=False)
    # описание карты
    description = models.TextField('Описание карты')
    # изображение карты
    image = models.ImageField('Изображение карты', blank=False,
                              upload_to=SaveMapImage('maps/'))

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """Переопределяем сохранение игровой карты."""
        if not self.url:
            self.url = pytils.translit.slugify(self.title)
        super(Map, self).save(*args, **kwargs)


class Profile(models.Model):
    """Модель профиля пользователя на ресурсе."""
    class Meta:
        db_table = "profiles"
        verbose_name = "Профиль пользователя"
        verbose_name_plural = "Профили пользователей"

    # модель пользователя в django
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # просмотренные метки карт
    watched_marks = models.ManyToManyField(MapMark)
