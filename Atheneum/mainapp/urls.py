from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

admin.site.site_header = "Atheneum iLMS "
admin.site.site_title = "Atheneum Admin"
admin.site.index_title = "Admin Panel"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('prediction.urls')),
    path('api/lib/',include('library.urls')),
    path('',TemplateView.as_view(template_name="index.html")),
    # path('/home',TemplateView.as_view(template_name="index.html"))
]
