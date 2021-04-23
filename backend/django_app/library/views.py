from django.shortcuts import render
from .models import Book,Author,Category,Issued_records, LOGofIssued

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
            i["author_id"]= Author.objects.get(id=i["author_id"]).getName()
            i["cat"] = []
            for j in Book.objects.get(id=i["id"]).categories.all():
                i["cat"].append(j.getName())
            i["cat"]=str(i["cat"])[1:-1]
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
        data_f = request.data
        data = data_f['iid']
        name = data_f['name'] 
        try:            
            biq = Book.objects.get(id=data)
        except:
            response_dict = {"statusB" : "Book does not exist "}
            return Response(response_dict,status=200)


        if(biq.status_b == False):
            response_dict = {"statusB" : "Issue FAILED "+biq.title}
            return Response(response_dict,status=200)

        biq.status_b = False
        biq.save()

        Issued_records.objects.create(tob=biq,nop=name)
        response_dict = {"statusB" : "Issue Successful "+biq.title + " to " + name}
        return Response(response_dict,status=200)

class Operation_returnBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        data_f = request.data
        data = data_f['iid'] 
        try:
            riq = Issued_records.objects.get(tob=data)
        except:
            response_dict = {"statusB" : "No such issue record found"}
            try:
                biq = Book.objects.get(id=data)
            except:
                return Response(response_dict,status=200)
            if(biq.status_b == True):
                return Response(response_dict,status=200)

            biq.status_b = True
            biq.save()

            return Response(response_dict,status=200)
        
        try:
            biq = Book.objects.get(id=data)

        except:
            response_dict = {"statusB" : "Book does not exist "}
            return Response(response_dict,status=200)


        if(biq.status_b == True):
            response_dict = {"statusB" : "Return FAILED :: book was not issued "+biq.title}
            return Response(response_dict,status=200)


        biq.status_b = True
        biq.save()

        LOGofIssued.objects.create(doi_log=riq.doi,tob_log=riq.tob,nop_log=riq.nop)
        
        #Issued_records.objects.delete(tob=biq)
        riq.delete()
    
        response_dict = {"statusB" : "Return Successful | "+biq.title+" ( Rack # : "+str(biq.phy_rack)+" )"}
        return Response(response_dict,status=200)

class GetThatBook(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data_f = request.data
        data = data_f['iid'] 
        try:
            cur_book = Book.objects.get(id=data)
            response_dict = {"status_b":1,"Title": cur_book.title, "Author":cur_book.author.getName(),"url": cur_book.book_url,"status":cur_book.status_b}
        except:
            response_dict = {"status_b":-1} 
        
        return Response(response_dict, status=200)


class GetIssueRecords(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self,format=None):
        cur_book = Issued_records.objects.values()

        for i in cur_book:
            i["tob_id"]= Book.objects.get(id=i["tob_id"]).getName()
            i["doi"] = str(i["doi"])[0:11]+" @ "+ str(i["doi"])[11:16]

        
        response_dict = {"issue": cur_book}
        return Response(response_dict, status=200)

class GetLogRecords(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self,format=None):
        cur_book = LOGofIssued.objects.values()

        for i in cur_book:
            i["tob_log_id"]= Book.objects.get(id=i["tob_log_id"]).getName()
            i["doi_log"] = str(i["doi_log"])[0:11]+" @ "+ str(i["doi_log"])[11:16]
            i["dor_log"] = str(i["dor_log"])[0:11]+" @ "+ str(i["dor_log"])[11:16]
        

        
        response_dict = {"issue": cur_book}
        return Response(response_dict, status=200)
    
class IsItAdmin(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def post(self,format=None):

        response_dict = {"detail": True}
        return Response(response_dict, status=200)