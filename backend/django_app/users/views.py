from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework import generics

# Create your views here.

class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class APILoginView(LoginView):
    pass


class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]
    
    
    
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
    IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user