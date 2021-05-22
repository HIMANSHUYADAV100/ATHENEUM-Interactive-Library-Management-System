from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Atheneum iLMS "
admin.site.site_title = "Atheneum Admin"
admin.site.index_title = "Admin Panel"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/', include('prediction.urls')),
    path('api/lib/',include('library.urls')),
]
