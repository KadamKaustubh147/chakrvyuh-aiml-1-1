from django.http import JsonResponse

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Quiz


class QuizGetView(APIView):
    """
    GET: Returns a riddle for the authenticated user.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        quiz = Quiz.objects.filter(user=request.user).first()
        if not quiz:
            return Response({"error": "No quiz found for this user."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"riddle": quiz.riddle}, status=status.HTTP_200_OK)


class QuizSubmitView(APIView):
    """
    POST: Takes user_answer and returns:
    - 0 → Correct answer
    - 1 → Worst answer
    - 2 → Wrong answer
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user_answer = request.data.get("user_answer")

        if not user_answer:
            return Response({"error": "user_answer not provided."}, status=status.HTTP_400_BAD_REQUEST)

        quiz = Quiz.objects.filter(user=request.user).first()
        if not quiz:
            return Response({"error": "No quiz found for this user."}, status=status.HTTP_404_NOT_FOUND)

        user_answer_clean = user_answer.strip().lower()
        correct = quiz.correct_answer.strip().lower()
        worst = quiz.worst_answer.strip().lower()

        # Compare answers
        if user_answer_clean == correct:
            code = 0
        elif user_answer_clean == worst:
            code = 1
        else:
            code = 2

        quiz.user_answer = user_answer
        quiz.save()

        return Response({"result": code}, status=status.HTTP_200_OK)


def health(request):
    return JsonResponse({"status": "ok"}, status=200)
