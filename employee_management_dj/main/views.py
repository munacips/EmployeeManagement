from .serializers import EmployeeSerializer, LeaveSerializer, NotificationSerializer, LoginSerializer, ReportSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Employee, EmployeeNotification, LeaveApplication, PersonalNotifications, Duty, Sale, DailyRecords, Report ,Dummy
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate , login , logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password
from django.core.files import File
import schedule
import datetime
import time
from datetime import timedelta

import json

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
    
@api_view(['GET','POST'])
def create_report(request,id):
    if request.method == 'GET':
        employee = Employee.objects.get(id=id)
        duties = Duty.objects.filter(employee=employee)
        sales = Sale.objects.filter(employee=employee)
        daily_records = DailyRecords.objects.filter(employee=employee)
        new_report = Report.objects.get_or_create()
        ## create the file here
        return Response(status=status.HTTP_201_CREATED)

@api_view(['POST'])
def checkin(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf8').replace("'", '"'))
        username = data["username"]
        password = data["password"] 
        try:
            employee = Employee.objects.get(username=username)
        except Employee.DoesNotExist:
            print(username,password)
            return Response(employee.id,status=status.HTTP_404_NOT_FOUND)
        user = authenticate(request, username=username, password = password)
        if user is not None:
            login(request , user)
            record, created = DailyRecords.objects.get_or_create(employee=employee,check_in_time = datetime.datetime.now())
            return Response(employee.id,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def checkout(request):
    data = json.loads(request.body.decode('utf8').replace("'", '"'))
    print("the id is : ",data["id"])
    id = data["id"]
    employee = Employee.objects.get(id=id)
    records = DailyRecords.objects.filter(employee=employee)
    print("the record : ",records)
    record = records.last()
    record.check_out_time = datetime.datetime.now().time()
    employee.total_time += ( datetime.datetime.combine(record.date,record.check_out_time) - datetime.datetime.combine(record.date,record.check_in_time))
    record.save()
    logout(request)
    return Response(status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def add_duty(request):
    data = json.loads(request.body.decode('utf8').replace("'", '"'))
    role = data["role"]
    description = data["description"]
    userId = data["userId"]
    print(data["userId"])
    print('hi',data)
    try:
        employee = Employee.objects.get(id=userId)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_204_NO_CONTENT)
    new_duty, created = Duty.objects.get_or_create(employee=employee,role=role,description=description)
    if created:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def add_sale(request):
    data = json.loads(request.body.decode('utf8').replace("'", '"'))
    item = data["item"]
    amount = data["amount"]
    date = data["date"]
    userId = data["userId"]
    print(data["userId"])
    print('hi',data)
    try:
        employee = Employee.objects.get(id=userId)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_204_NO_CONTENT)
    new_sale, created = Sale.objects.get_or_create(employee=employee,item=item,amount=amount,date=date)
    if created:
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def user_info(request):
    return Response(request.session.get('UserInfo'))

@api_view(['POST'])
def create_report(request):
    data = json.loads(request.body.decode('utf8').replace("'", '"'))
    print("The data : " + str(request.body) + '')
    id = data["userId"]
    date_from = data["date_from"]
    date_to = data["date_to"]
    employee = Employee.objects.get(id=id)
    print("The employee ", employee)
    records = DailyRecords.objects.filter(employee=employee)
    records = records.filter(date__range=[str(date_from),str(date_to)])
    duties = Duty.objects.filter(employee=employee)
    duties = duties.filter(date__range=[str(date_from),str(date_to)])
    sales = Sale.objects.filter(employee=employee)
    sales = sales.filter(date__range=[str(date_from),str(date_to)])
    new_report, created = Report.objects.get_or_create(employee=employee,date_from=date_from,date_to=date_to)
    f = open('file_{0}.txt'.format(new_report.id),'a+')
    f.truncate(0)
    f.write(f"Report for {employee.username} \n")
    f.write(f"Leave days left : {employee.leave_days} \n")
    f.write("\n")
    f.write("DUTIES DONE \n")
    for duty in duties:
        f.write(str(duty) + "\n")
        f.write("_____\n")
    f.write("SALES DONE\n")
    print(sales)
    for sale in sales:
        f.write(str(sale)+"\n")
    total_time = timedelta(0)
    for record in records.iterator():
        if record.check_out_time == None:
            total_time += (datetime.datetime.combine(record.date,datetime.time(23,0,0,tzinfo=None)) - datetime.datetime.combine(record.date,record.check_in_time))
        else:
            total_time += (record.check_out_time - record.check_in_time)
    f.write("_____\n")
    f.write("Total time at work: " + str(total_time)+ "\n")
    my_file = File(f)
    new_report.file = my_file
    new_report.save()
    return Response(my_file,status=status.HTTP_200_OK)

@api_view(['POST'])
def apply_leave(request):
    data = json.loads(request.body.decode('utf8').replace("'", '"'))
    id = data['userId']
    days = data['days']
    leave_date = data['leave_date']
    return_date = datetime.datetime.strptime(leave_date,"%Y-%m-%d") + timedelta(int(days))
    employee = Employee.objects.get(id=id)
    if employee.on_leave:
        return Response("Alrealdy on leave",status=status.HTTP_406_NOT_ACCEPTABLE)
    elif employee.leave_days < int(days) :
        return Response("Not enough days left",status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        new_application, create = LeaveApplication.objects.get_or_create(employee=employee,leave_date=leave_date,return_date=return_date)
        return Response("Application sent, now waiting for approval",status=status.HTTP_201_CREATED)
        
@api_view(['GET'])   
def reports(request):
    reports = Report.objects.all()
    serializer = ReportSerializer(reports,many=True)
    return Response(serializer.data)

@api_view(['GET'])    
def up_leaves(request):
    leaves = LeaveApplication.objects.filter(granted=True)
    serializer = LeaveSerializer(leaves,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def pending_leaves(request):
    leaves = LeaveApplication.objects.filter(granted=False)
    serializer = LeaveSerializer(leaves,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def approve(request,id):
    application = LeaveApplication.objects.get(id=id)
    application.granted = True
    application.save
    serializer = LeaveSerializer(application)
    return Response(serializer.data)