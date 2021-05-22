from django.urls import path
import prediction.views as views
urlpatterns = [

    path('getRecommendations/',
         views.BookRecommendationAPI.as_view(),
         name="book_Recommendations")
]
