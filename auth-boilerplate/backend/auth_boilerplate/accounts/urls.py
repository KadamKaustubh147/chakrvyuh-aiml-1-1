from django.urls import path
from .views import CustomLoginView, CustomLogoutView, CustomRefreshView 


urlpatterns = [
    path('login', CustomLoginView.as_view(), name='login'),
    path('logout', CustomLogoutView.as_view(), name='logout'),
    path('refresh', CustomRefreshView.as_view(), name='refresh'),
    # path('google', CustomGoogleLoginView.as_view(), name='refresh'),
]
