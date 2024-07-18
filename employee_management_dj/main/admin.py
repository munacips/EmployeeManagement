from django.contrib import admin
from .models import Employee, EmployeeNotification, LeaveApplication, Dummy, Duty, Sale, PersonalNotifications

admin.site.register([Employee, EmployeeNotification, LeaveApplication, Dummy, Duty, Sale, PersonalNotifications])