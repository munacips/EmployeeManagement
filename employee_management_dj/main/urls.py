from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('employees/',views.employees,name="employee"),
    path('employees/<int:id>',views.employee_details,name="employee_details"),
    path('leave_applications/',views.leave_application,name="leave_application"),
    path('leave_details/<int:id>',views.leave_details,name="leave_details"),
    path('create_report/<int:id>',views.create_report,name="create_report"),
    path('checkin',views.checkin,name="checkin"),
    path('checkout/',views.checkout,name="checkout"),
    path('add_duty/',views.add_duty,name="add_duty"),
    path('info/',views.user_info,name="userinfo"),
    path('add_sale/',views.add_sale,name="add_sale"),
    path('create_report/',views.create_report,name="create_report"),
    path('reports/',views.reports,name="reports"),
    path('apply_leave/',views.apply_leave,name="apply_leave"),
    path('up_leaves/',views.up_leaves,name="up_leaves"),
    path('pending_leaves/',views.pending_leaves,name="pending_leaves"),
    path('approve_leave/<int:id>/',views.approve,name="approve")
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL , document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)

