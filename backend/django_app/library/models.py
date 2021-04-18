from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name
    
    def getName(self):
        return self.name

    class Meta:
        ordering = ['name']

class Author(models.Model):
    name = models.CharField(max_length=40)
    
    def __str__(self):
        return self.name
    
    def getName(self):
        return self.name

    class Meta:
        ordering = ['name']

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete = models.CASCADE, related_name="books")
    categories = models.ManyToManyField(Category)
    status_b = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
    def getName(self):
        return self.title

    class Meta:
        ordering = ['title']

class Issued_records(models.Model):
    doi = models.DateTimeField(auto_now_add=True)
    tob = models.ForeignKey(Book, on_delete = models.DO_NOTHING, related_name="recordofissue")
    
    def __str__(self):
        return self.book
    
    def getName(self):
        return self.book

    class Meta:
        ordering = ['doi']
    


