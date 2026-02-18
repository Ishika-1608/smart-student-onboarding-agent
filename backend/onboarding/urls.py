from django.urls import path
from .views import next_action, student_tasks, chat_with_agent, admin_stats, student_login

urlpatterns = [
    path('next-action/<str:admission_id>/', next_action),
    path('tasks/<str:admission_id>/', student_tasks),
    path('chat/', chat_with_agent),
    path('admin-stats/', admin_stats),
    path('login/', student_login),

]
