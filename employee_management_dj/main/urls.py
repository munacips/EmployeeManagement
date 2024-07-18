from django.urls import path
from . import views

urlpatterns = [
    path('employees/',views.employees,name="employee"),
    path('employees/<int:id>',views.employee_details,name="employee_details"),
    path('leave_applications/',views.leave_application,name="leave_application"),
    path('leave_details/<int:id>',views.leave_details,name="leave_details")
]

