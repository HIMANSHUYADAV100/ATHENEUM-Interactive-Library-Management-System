from django.shortcuts import render
from .models import Book,Author,Category,Issued_records

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status
import json

# Create your views here.
def home(request):
    books = Book.objects.all()
    authors = Author.objects.all()
    context = {"books": books, "authors": authors}
    return render(request, "homepage.html", context)

def library(request):
    books = Book.objects.all()
    context = {"books":books}
    return Response(context,status=200)


# Class based Functions to return required stuff to frontend
class Library_Books(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self,format=None):
        cur_book = Book.objects.values()
        for i in cur_book:
            if i["status_b"] == True:
                i["Status"] = "Available"
            else:
                i["Status"] = "Not Available"
        response_dict = {"Books": cur_book}
        return Response(response_dict, status=200)
    
class Operation_issueBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        data = request.data
        data = data.iid
        biq = Book.objects.get(id=data)
        biq.status_b = False
        Issued_records.objects.create(tob=biq.title)
        response_dict = {"Issue Successful ": biq.title}
        
        return Response(response_dict,status=200)

