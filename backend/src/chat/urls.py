from django.urls import path, re_path
from .views import ProfileViewSet
from rest_framework.routers import DefaultRouter

app_name = "chat"
router = DefaultRouter()
router.register(r'', ProfileViewSet, basename='profile')
urlpatterns = router.urls
