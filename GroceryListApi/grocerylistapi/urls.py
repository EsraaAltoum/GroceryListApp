from django.conf.urls import include
from django.contrib import admin
from django.urls import path

#defining admin and api paths
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
