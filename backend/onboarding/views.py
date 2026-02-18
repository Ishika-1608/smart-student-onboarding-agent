from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import date
from .ai_service import ask_ai


# -------------------------------
# MOCK DATA (Prototype Purpose)
# -------------------------------

STUDENT_TASKS = {
    "2026CS001": [
        {
            "title": "Upload Documents",
            "deadline": "2026-02-19",
            "status": "PENDING",
        },
        {
            "title": "Fee Payment",
            "deadline": "2026-02-18",
            "status": "PENDING",
        },
        {
            "title": "LMS Activation",
            "deadline": "2026-02-22",
            "status": "PENDING",
        },
    ]
}


# -------------------------------
# GET STUDENT TASKS
# -------------------------------
@api_view(["GET"])
def get_tasks(request, admission_id):
    tasks = STUDENT_TASKS.get(admission_id, [])
    return Response(tasks)


# -------------------------------
# NEXT RECOMMENDED ACTION
# -------------------------------
@api_view(["GET"])
def get_next_action(request, admission_id):
    tasks = STUDENT_TASKS.get(admission_id, [])

    pending_tasks = [t for t in tasks if t["status"] == "PENDING"]

    if not pending_tasks:
        return Response(
            {"message": "All onboarding tasks completed 🎉"}
        )

    next_task = pending_tasks[0]

    return Response(
        {
            "message": f"Your next priority is '{next_task['title']}'. Complete this before {next_task['deadline']}."
        }
    )


# -------------------------------
# AI CHATBOT
# -------------------------------
@api_view(["POST"])
def chat_with_agent(request):
    question = request.data.get("message", "")

    context = """
    You are a Smart Student Onboarding Assistant.
    Help students understand onboarding tasks like fee payment,
    document upload, and LMS activation.
    Give short and clear answers.
    """

    try:
        answer = ask_ai(question, context)
        return Response({"reply": answer})

    except Exception as e:
        return Response(
            {"reply": "AI service temporarily unavailable."}
        )


# -------------------------------
# ADMIN DASHBOARD STATS
# -------------------------------
@api_view(["GET"])
def admin_stats(request):
    total_students = len(STUDENT_TASKS)

    completed = 0
    pending = 0

    for student in STUDENT_TASKS.values():
        for task in student:
            if task["status"] == "COMPLETED":
                completed += 1
            else:
                pending += 1

    return Response(
        {
            "total_students": total_students,
            "completed": completed,
            "pending": pending,
        }
    )
