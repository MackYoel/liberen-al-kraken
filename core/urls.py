from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import include, path

from . import api, views

app_name = 'core'

router = DefaultRouter()
router.register('tests', api.TestViewSet, base_name='api_test')

apipatterns = router.urls + [
    path('tests/<int:pk>/questions/', api.QuestionList.as_view()),
]

urlpatterns = [
    path('', views.home, name='core'),
    path('tests/api/', include(apipatterns)),
]
