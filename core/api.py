from rest_framework import viewsets, permissions, generics
from django.shortcuts import get_object_or_404

from . import models, serializers


class TestViewSet(viewsets.ModelViewSet):
    queryset = models.Test.objects.all()
    serializer_class = serializers.TestSerializer


class QuestionList(generics.ListAPIView):

    serializer_class = serializers.QuestionSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        test = get_object_or_404(models.Test, pk=pk)
        return test.questions.all()
