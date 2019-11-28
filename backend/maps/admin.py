from django.contrib import admin
from .models import Map, MapMark, Profile
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User


class MapInline(admin.StackedInline):
    """Класс для администрировния меток внутри карты."""
    model = MapMark
    extra = 1


class MapAdmin(admin.ModelAdmin):
    """Класс для администрирования карты."""
    inlines = [MapInline]
    exclude = ['width', 'height']


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
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
