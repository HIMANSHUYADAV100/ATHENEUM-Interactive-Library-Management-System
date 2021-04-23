from django.contrib import admin

# Register your models here.
from .models import Category
from .models import Author
from .models import Book
from .models import Issued_records
from .models import LOGofIssued

admin.site.register(Category)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Issued_records)
admin.site.register(LOGofIssued)
