from django.urls import path

from .views import home
from .views import Library_Books
from .views import Operation_issueBook
from .views import Operation_returnBook
from .views import GetThatBook
from .views import GetIssueRecords
from .views import GetLogRecords
from .views import IsItAdmin


urlpatterns = [
    path("", home, name="lhome"),
   
    path('books/', Library_Books.as_view(), name = 'books'),
    path('issue/', Operation_issueBook.as_view(), name = 'issue'),
    path('return/', Operation_returnBook.as_view(), name = 'return'),
    path('getbook/', GetThatBook.as_view(), name = 'getbook'),
    path('getissuerec/', GetIssueRecords.as_view(), name = 'getissuerec'),
    path('getlogrec/', GetLogRecords.as_view(), name = 'getlogrec'),
    path('isitadmin/', IsItAdmin.as_view(), name = 'isadminornot'),
]