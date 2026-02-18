from django.urls import path
from .views import (
    get_tasks,
    get_next_action,
    chat_with_agent,
    admin_stats,
)

urlpatterns = [
    path("tasks/<str:admission_id>/", get_tasks),
    path("next-action/<str:admission_id>/", get_next_action),
    path("chat/", chat_with_agent),
    path("admin-stats/", admin_stats),
]
