from .serializers import EmployeeSerializer, LeaveSerializer, NotificationSerializer
from rest_framework.decorators import api_view
from .models import Employee, EmployeeNotification, LeaveApplication, PersonalNotifications, Duty, Sale, DailyRecords, Report, Dummy
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
import schedule
import datetime

def checkLeaveDays():
    leaves = LeaveApplication.objects.all()
    for leave in leaves:
        if leave.granted:
            days = leave.leave_date - datetime.datetime.date()
            if  days > 0 and days < 6:
                message = "Your leave is in " + days + " days."
                receiver = leave.employee
                new_message, created = PersonalNotifications.objects.get_or_create(message = message, receiver = receiver)
                new_message.save()

def resetLeaveDays():
    employees = Employee.objects.all()
    for employee in employees:
        employee.leave_days += 60

def dummyJob():
    new_dummy, created = Dummy.objects.get_or_create()
    new_dummy.save()

schedule.every(24).hours.do(checkLeaveDays)
schedule.every(365).days.do(resetLeaveDays)
schedule.every(5).seconds.do(dummyJob)

def sendNotification(serializer):
    leave_taker = Employee.objects.get(id=int(serializer.data['employee']))
    message = str(leave_taker) + " is taking a leave from " + serializer.data['leave_date'] + " to " + serializer.data['return_date'] + " please adjust accordingly"
    new_notification, created = EmployeeNotification.objects.get_or_create(message=message,notifier=leave_taker)
    new_notification.save()
    return Response(serializer.data)

@api_view(['GET','POST'])
def employees(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET','PUT','DELETE'])
def employee_details(request,id):
    try:
        employee = Employee.objects.get(id=id)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT )
        
@api_view(['GET','POST'])
def leave_application(request):
    if request.method == 'GET':
        leaves = LeaveApplication.objects.all()
        serializer = LeaveSerializer(leaves,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = LeaveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
@api_view(['PUT','GET','DELETE'])
def leave_details(request,id):
    try:
        leave = LeaveApplication.objects.get(id=id)
    except LeaveApplication.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = LeaveSerializer(leave)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = LeaveSerializer(leave,data=request.data)
        if serializer.is_valid():
            serializer.save()
            sendNotification(serializer)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        leave.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

def create_report(request,id):
    employee = Employee.objects.get(id=id)
    duties = Duty.objects.filter(employee=employee)
    sales = Sale.objects.filter(employee=employee)
    daily_records = DailyRecords.objects.filter(employee=employee)
    new_report = Report.objects.get_or_create()

def checkin(request,id):
    login(request,id)
    employee = Employee.objects.get(id=id)
    record = DailyRecords.objects.get_or_create(employee=employee)
    record.check_in_time = datetime.datetime.now()
    record.save()

def checkout(request,id):
    employee = Employee.objects.get(id=id)
    record = DailyRecords.objects.get(employee=employee)
    record.check_out_time = datetime.datetime.now()
    record.save()
    logout(request)