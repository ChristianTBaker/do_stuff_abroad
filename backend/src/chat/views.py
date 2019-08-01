from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.safestring import mark_safe
from .models import Profile
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer
from rest_framework import viewsets
import json


def index(request):
    return render(request, "chat/index.html", {})


@login_required
def room(request, room_name):
    return render(
        request,
        "chat/room.html",
        {
            "room_name_json": mark_safe(json.dumps(room_name)),
            "username": mark_safe(json.dumps(request.user.username)),
        },
    )


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filterset_fields = ['user']
