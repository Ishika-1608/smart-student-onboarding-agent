from django.contrib import admin
from .models import Student, OnboardingTask, Ticket

admin.site.register(Student)
admin.site.register(OnboardingTask)
admin.site.register(Ticket)
