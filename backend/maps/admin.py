from django.contrib import admin
from .models import Map, MapMark, Profile, \
    Audio, MapDescriptionItem, MarkDescriptionItem
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User


class Marks(admin.StackedInline):
    """Класс для администрировния меток внутри карты."""
    model = MapMark
    extra = 1

# class MarkDescriptionFragment(admin.StackedInline):
#     """Класс для алминистрирования описания меток внутри карты"""
#     model = MarkDescriptionItem


class DescriptionFragment(admin.StackedInline):
    """Класс для администрирования описания внутри карты"""
    model = MapDescriptionItem
    extra = 1


class MapAdmin(admin.ModelAdmin):
    """Класс для администрирования карты."""
    inlines = [Marks, DescriptionFragment]
    exclude = ['width', 'height']

class AudioInline(admin.StackedInline):
    """Класс для администрирования аудио треков"""
    model = Audio


class ProfileInline(admin.StackedInline):
    """Класс для администрирования профиля внутри пользователя."""
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    """"""
    inlines = [ProfileInline]


admin.site.register(Map, MapAdmin)
admin.site.register(Audio, admin.ModelAdmin)
admin.site.register(MarkDescriptionItem, admin.ModelAdmin)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
