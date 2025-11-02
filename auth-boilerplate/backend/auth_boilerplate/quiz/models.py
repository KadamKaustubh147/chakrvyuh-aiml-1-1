from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Quiz(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    riddle = models.CharField()
    user_answer = models.CharField(blank=True, null=True)
    correct_answer =  models.CharField()

    def __str__(self):
        return f"{self.user.username}"