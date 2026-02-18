from django.db import models


class Student(models.Model):
    admission_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    branch = models.CharField(max_length=50)
    hostel_required = models.BooleanField(default=False)
    onboarding_progress = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class OnboardingTask(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('UNDER_REVIEW', 'Under Review'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    priority = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.student.name} - {self.title}"


class Ticket(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issue = models.TextField()
    department = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default="OPEN")

    def __str__(self):
        return f"{self.student.name} - {self.department}"
