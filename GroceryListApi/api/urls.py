from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import GroceryItemViewSet
# GroceryListViewSet

#creating router
router = routers.DefaultRouter()
#registering grocery list viewset into router
router.register('grocery-list', GroceryItemViewSet)

#creating root path
urlpatterns = [
    path('', include(router.urls)),
]
