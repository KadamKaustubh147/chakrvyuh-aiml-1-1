from django.urls import path
from .views import QuizGetView, QuizSubmitView
from . import views

urlpatterns = [
    path("questions", QuizGetView.as_view(), name="quiz_get"),
    path("question_submit", QuizSubmitView.as_view(), name="quiz_submit"),
    path("health", views.health, name="health"),
]
