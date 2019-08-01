from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from chat.views import index

urlpatterns = [
    path("admin/", admin.site.urls),
    path("chat/", include("chat.urls", namespace="chat")),
    path('token-auth/', obtain_jwt_token),
    path("authentication/", include('authentication.urls')),
]
