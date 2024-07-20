from django.forms import ValidationError
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from .models import Employee, LeaveApplication, EmployeeNotification, Report
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model =  Employee
        fields = ['username','first_name','last_name','email','leave_days','role','id']


class LeaveSerializer(ModelSerializer):
    class Meta:
        model = LeaveApplication
        fields = '__all__'


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = EmployeeNotification
        fields = '__all__'


class LoginSerializer(Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self, data):
        user = authenticate(request= data['request'],username = data['username'],password=data['password'])
        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return user
    
class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class LeaveSerializers(ModelSerializer):
    class Meta:
        model = LeaveApplication
        fields = '__all__'