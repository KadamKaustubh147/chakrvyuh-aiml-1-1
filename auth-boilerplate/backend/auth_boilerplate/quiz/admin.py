from django.contrib import admin
from .models import Quiz

# Register your models here.

    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    # riddle = models.CharField()
    # user_answer = models.CharField()
    # correct_answer =  models.CharField()
    # worst_answer = models.CharField()

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('user', 'riddle', 'user_answer', 'correct_answer')