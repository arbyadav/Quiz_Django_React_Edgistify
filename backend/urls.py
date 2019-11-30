"""ModuleQuiz URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path
from django.conf.urls import url, include
from django.views.generic import TemplateView

from .views import RegisterAPI, LoginAPI, UserAPI, QuizzesAPI, QuizDetailAPI, ResponseAPI, QuizResultAPI
from knox import views as knox_views

urlpatterns = [
    path('home/', TemplateView.as_view(template_name='index.html')),
    path('api/auth/', include('knox.urls')),
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/quizzes/', QuizzesAPI.as_view()),
    re_path(r'^api/quizzes/(?P<slug>[\w\-]+)/$', QuizDetailAPI.as_view()),
    re_path(r'^api/response/', ResponseAPI.as_view()),
    re_path(r'^api/quizresult/(?P<slug>[\w\-]+)/$', QuizResultAPI.as_view()),
]

# # from .views import QuizViewSet
# from rest_framework.routers import DefaultRouter
# # router = DefaultRouter()
# # router.register(r'quiz', QuizViewSet, base_name='quiz')
# url(r'', include(router.urls)),
# # urlpatterns += router.urls ## or this can be used
