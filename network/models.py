from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete = models.CASCADE, related_name="posts"
    )

    content = models.TextField()

    timestamp = models.DateTimeField(auto_now_add=True)

    likes = models.ManyToManyField(
        User, blank = True, related_name = "liked_posts"
    )

class Follow(models.Model):
    follower = models.ForeignKey(
        User, on_delete = models.CASCADE, related_name="following"
    )

    following = models.ForeignKey(
        User, on_delete = models.CASCADE, related_name="followers"
    )

class Meta(models.Model):
    unique_together = ("follower", "following")

    