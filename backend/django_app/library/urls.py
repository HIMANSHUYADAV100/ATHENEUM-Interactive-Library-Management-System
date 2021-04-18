from django.urls import path

from .views import home
from .views import Library_Books
from .views import Operation_issueBook

urlpatterns = [
    path("", home, name="lhome"),
   
    path('books/', Library_Books.as_view(), name = 'books'),
    path('issue/', Operation_issueBook.as_view(), name = 'issue'),
]