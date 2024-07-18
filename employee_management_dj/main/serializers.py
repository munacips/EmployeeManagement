from rest_framework.serializers import ModelSerializer
from .models import Employee, LeaveApplication, EmployeeNotification

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model =  Employee
        fields = ['username','first_name','last_name','email','leave_days','role']


class LeaveSerializer(ModelSerializer):
    class Meta:
        model = LeaveApplication
        fields = '__all__'


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = EmployeeNotification
        fields = '__all__'