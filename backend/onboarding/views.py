from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .models import OnboardingTask
from .smart_engine import get_next_action
from .ai_service import ask_ai
from django.db.models import Count

@api_view(['GET'])
def next_action(request, admission_id):
    try:
        student = Student.objects.get(admission_id=admission_id)
        result = get_next_action(student)
        return Response(result)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=404)

@api_view(['GET'])
def student_tasks(request, admission_id):
    tasks = OnboardingTask.objects.filter(
        student__admission_id=admission_id
    )

    data = []

    for task in tasks:
        data.append({
            "title": task.title,
            "description": task.description,
            "deadline": task.deadline,
            "status": task.status,
        })

    return Response(data)

@api_view(['POST'])
def chat_with_agent(request):
    admission_id = request.data.get("admission_id")
    question = request.data.get("question")

    student = Student.objects.get(admission_id=admission_id)
    tasks = OnboardingTask.objects.filter(student=student)

    context = "\n".join([
        f"{t.title} - {t.status} - deadline {t.deadline}"
        for t in tasks
    ])

    answer = ask_ai(question, context)

    return Response({"reply": answer})

@api_view(['GET'])
def admin_stats(request):
    total_students = Student.objects.count()

    total_tasks = OnboardingTask.objects.count()
    completed_tasks = OnboardingTask.objects.filter(
        status="COMPLETED"
    ).count()

    pending_tasks = OnboardingTask.objects.filter(
        status="PENDING"
    ).count()

    completion_rate = 0
    if total_tasks > 0:
        completion_rate = int((completed_tasks / total_tasks) * 100)

    # bottleneck task (most pending)
    bottleneck = (
        OnboardingTask.objects
        .filter(status="PENDING")
        .values("title")
        .annotate(count=Count("title"))
        .order_by("-count")
        .first()
    )

    return Response({
        "total_students": total_students,
        "pending_tasks": pending_tasks,
        "completion_rate": completion_rate,
        "bottleneck": bottleneck["title"] if bottleneck else "None"
    })

@api_view(['POST'])
def student_login(request):
    admission_id = request.data.get("admission_id")
    name = request.data.get("name")

    student, created = Student.objects.get_or_create(
        admission_id=admission_id,
        defaults={"name": name}
    )

    return Response({
        "admission_id": student.admission_id,
        "name": student.name
    })
