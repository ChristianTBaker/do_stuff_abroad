from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Group(models.Model):
    group_name = models.CharField(max_length=255, unique=True)


class Message(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="author_messages"
    )
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def last_30_messages(current_group_name):
        current_group = Group.objects.filter(group_name=current_group_name)
        return Message.objects.filter(group=current_group[0]).all().order_by("-timestamp").all()[:30]
