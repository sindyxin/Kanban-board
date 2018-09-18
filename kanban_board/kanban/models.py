from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Board(models.Model):
    name = models.CharField(max_length=500, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class List(models.Model):
    name = models.CharField(max_length=500, unique=True)
    board = models.ForeignKey(Board, related_name="lists", on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class Card(models.Model):
    name = models.CharField(max_length=500, unique=True)
    description = models.CharField(max_length=264, blank=True, null=True)
    card_list = models.ForeignKey(List, related_name="cards", on_delete=models.CASCADE)
    assigned = models.ManyToManyField(User, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("created_on",)


class Comment(models.Model):
    content = models.TextField(default='')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    card = models.ForeignKey(Card, related_name="comments", on_delete=models.CASCADE)

    class Meta:
        ordering = ("created_on",)
