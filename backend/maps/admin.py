from django.contrib import admin
from .models import Map, MapMark


class MapInline(admin.StackedInline):
    """Класс для администрировния меток внутри карты."""
    model = MapMark
    extra = 1


class MapAdmin(admin.ModelAdmin):
    """Класс для администрирования карты."""
    inlines = [MapInline]
    exclude = ['width', 'height']


admin.site.register(Map, MapAdmin)
