import csv
from django.contrib.auth.models import User
from quiz.models import Quiz  # 🔁 adjust if needed

with open("riddle.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        username = row["Team_ID"].strip().lower()  # ✅ use Team_ID
        riddle_text = row["Riddle"].strip()
        correct_answer = row["Final_Answer"].strip()

        # Get or create user
        user, _ = User.objects.get_or_create(username=username)

        # Create the Quiz
        Quiz.objects.create(
            user=user,
            riddle=riddle_text,
            correct_answer=correct_answer
        )

print("✅ All riddles added successfully!")
