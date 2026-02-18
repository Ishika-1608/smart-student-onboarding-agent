from datetime import date
from .models import OnboardingTask


def get_next_action(student):
    tasks = OnboardingTask.objects.filter(
        student=student,
        status="PENDING"
    )

    if not tasks.exists():
        return {
            "message": "All onboarding steps completed. Welcome onboard!"
        }

    # Sort by deadline first, then priority
    tasks = sorted(
        tasks,
        key=lambda x: (x.deadline, -x.priority)
    )

    next_task = tasks[0]

    days_left = (next_task.deadline - date.today()).days

    return {
        "task": next_task.title,
        "description": next_task.description,
        "deadline": next_task.deadline,
        "days_left": days_left,
        "message": f"Your next priority is '{next_task.title}'. Complete this before {next_task.deadline}."
    }
