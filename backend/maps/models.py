import os

from PIL import Image
from django.db import models
from django.utils.deconstruct import deconstructible
from django.contrib.auth.models import User

import pytils


@deconstructible
class SaveMapImage:
    """Для сохранения изображения для метки на карте."""
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


@deconstructible
class SaveMarkImage:
    """Для сохранения изображения для карты."""
    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        """Функция для upload_to thumbnail.
        :param instance: экземпляр класса, с которым работаем
        :param filename: имя загружаемой картинки
        :return: результирующий путь
        """
        # создаем путь и не забываем про расширение
        url = '{}_{}'.format(instance.map_id, instance.title)
        return "{}.{}".format(os.path.join(self.path, url),
                              filename.split('.')[-1])


class MapMark(models.Model):
    """Модель метки на карте."""
    class Meta:
        db_table = "map_marks"
        verbose_name = "Метка на карте"
        verbose_name_plural = "Метки на карте"
        unique_together = ('title', 'map')

    # заголовок метки
    title = models.CharField('Заголовок', max_length=255,
                             help_text='Уникальный для данной карты')
    # # картинка
    # image = models.ImageField('Изображение карты',
    #                           upload_to=SaveMarkImage('maps/marks'))


    # ссылка на карту, к которой относится метка
    map = models.ForeignKey('Map', related_name='marks', blank=False,
                            on_delete=models.CASCADE)
    # радиус метки
    radius = models.PositiveIntegerField('Радиус метки',
                                         help_text='В пикселях')
    # x-координата метки
    x_coordinate = models.PositiveIntegerField('x-координата метки',
                                               help_text='В пикселях')
    # y-координата метки
    y_coordinate = models.PositiveIntegerField('y-координата метки',
                                               help_text='В пикселях')

    def __str__(self):
        return '{}:{}'.format(self.map.title, self.title)


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
    title = models.CharField('Название карты', max_length=255)
    # краткое описание карты
    description = models.TextField('Краткое описание карты')

    # изображение карты
    image = models.ImageField('Изображение карты',
                              upload_to=SaveMapImage('maps/originals'))
    # TODO: можно воссоздавать это изображение из большого
    # малое изображение карты
    thumbnail = models.ImageField('Миниатюра карты',
                                  upload_to=SaveMapImage('maps/thumbnails'))
    # ширина
    width = models.IntegerField('Ширина карты', blank=True)
    # высота
    height = models.IntegerField('Высота карты', blank=True)

    # аудио_карта
    audio_map = models.TextField('Карта аудио')

    # треки
    tracks = models.ManyToManyField('Audio')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """Переопределяем сохранение игровой карты."""
        if not self.url:
            self.url = pytils.translit.slugify(self.title)

        img = Image.open(self.image)
        self.width = img.width
        self.height = img.height
        super(Map, self).save(*args, **kwargs)


class Audio(models.Model):

    class Meta:
        db_table = "audio"
        verbose_name = "Аудио"
        verbose_name_plural = "Аудио"

    title = models.CharField('Имя трека', max_length=256, default='Random track')
    file = models.FileField(upload_to="audio")

    def __str__(self):
        return self.title + '({})'.format(self.id)


class MapDescriptionItem(models.Model):

    class Meta:
        db_table = "map_description_item"
        verbose_name = "Фрагмент описания карты"
        verbose_name_plural = "Полное писание карты"

    # тип фрагмента описания
    type = models.CharField('Тип', choices=(
        ('h1', 'Большой заголовок'),
        ('h3', 'Малый заголовок'),
        ('img', 'Картинка'),
        ('paragraph', 'html-Абзац')
    ), max_length=256)

    # текстовая часть (если есть)
    content = models.TextField('Содержание', blank=True,
                            help_text='Используйте теги html и т.д.')

    # файловая часть (если есть)
    src = models.FileField('Прикрепить файл', blank=True, 
                upload_to='maps/description')

    map = models.ForeignKey('Map', related_name='map_description_items', blank=False,
                            on_delete=models.CASCADE)

    def __str__(self):
        return '{}:{}'.format(self.map.title, self.id)


class MarkDescriptionItem(models.Model):

    class Meta:
        db_table = "mark_description_item"
        verbose_name = "Фрагмент описания метки"
        verbose_name_plural = "Описания меток"

    # тип фрагмента описания
    type = models.CharField('Тип', choices=(
        ('h1', 'Большой заголовок'),
        ('h3', 'Малый заголовок'),
        ('img', 'Картинка'),
        ('paragraph', 'html-Абзац')
    ), max_length=256)

    # текстовая часть (если есть)
    content = models.TextField('Содержание', blank=True,
                            help_text='Используйте теги html.')

    # файловая часть (если есть)
    src = models.FileField('Прикрепить файл', blank=True, 
                upload_to='maps/description')

    mark = models.ForeignKey('MapMark', related_name='mark_description_items', blank=False,
                            on_delete=models.CASCADE)

    def __str__(self):
        return '{}:{}:{}'.format(self.mark.map.title, self.mark.title, self.id)



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
