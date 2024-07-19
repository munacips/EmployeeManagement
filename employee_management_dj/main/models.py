from django.db import models
from django.contrib.auth.models import User

class Employee(User):
    leave_days = models.IntegerField(default=60) #use a schedular to recycle after every year
    on_leave = models.BooleanField(default=False)
    role = models.CharField(max_length=100)
    is_manager = models.BooleanField(default=False)
    total_time = models.IntegerField(default=0)


class LeaveApplication(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.DO_NOTHING)
    leave_date = models.DateField()
    return_date = models.DateField()
    granted = models.BooleanField(default=False)


class EmployeeNotification(models.Model): #works as a reminder too
    message = models.CharField(max_length=500)
    time = models.DateTimeField(auto_now_add=True)
    notifier = models.ForeignKey(User,on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.notifier) + ' : ' + str(self.message)
    

class PersonalNotifications(models.Model):
    message = models.CharField(max_length=200)
    receiver = models.ForeignKey(Employee,on_delete=models.DO_NOTHING)
    date = models.DateField(auto_now_add=True)


class Sale(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.DO_NOTHING)
    date = models.DateField()
    amount = models.DecimalField(max_digits=12,decimal_places=2)
    item = models.CharField(max_length=100,default="Item")

    def __str__(self):
        return str(self.item) + ' sold ' + str(self.amount)


class Duty(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.DO_NOTHING)
    date = models.DateField(auto_now_add=True)
    role = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return str(self.role) + ' : ' + str(self.description)
    
    class Meta:
        verbose_name_plural = 'Duties'


class Report(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.DO_NOTHING)
    file = models.FileField(upload_to='reports')
    date_from = models.DateField()
    date_to = models.DateField()



class DailyRecords(models.Model):
    employee = models.ForeignKey(Employee,on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    check_in_time = models.TimeField(auto_now_add=True)
    check_out_time = models.TimeField(null=True,blank=True)


class Dummy(models.Model):
    date = models.DateTimeField(auto_now_add=True)