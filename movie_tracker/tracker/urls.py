from django.urls import path
from .views import watched_list_view

urlpatterns = [
    path('', watched_list_view, name='watched_list'),
]