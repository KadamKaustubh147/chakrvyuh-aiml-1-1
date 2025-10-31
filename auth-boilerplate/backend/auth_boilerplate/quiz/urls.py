from django.urls import path
from .views import QuizGetView, QuizSubmitView

urlpatterns = [
    path("questions", QuizGetView.as_view(), name="quiz_get"),
    path("question_submit", QuizSubmitView.as_view(), name="quiz_submit"),
]
