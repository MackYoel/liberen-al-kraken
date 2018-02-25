from rest_framework import viewsets, permissions, generics, views, response
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


class NewQuiz(views.APIView):

    def post(self, request):
        name = request.data.get('name')
        questions = request.data.get('questions')

        if None in (name, questions):
            return response.Response('Nombre y preguntas son requeridos', status=400)

        test = models.Test.objects.create(name=name)

        created_questions = []
        questions = questions or []
        for question_data in questions:
            question = models.Question.objects.create(
                complement=question_data.get('complement'),
                title=question_data.get('title'),)

            for answer_data in question_data.get('answers'):
                models.Answer.objects.create(
                    content=answer_data.get('content'),
                    is_right=answer_data.get('is_right', False),
                    question=question)

            created_questions.append(question)
        test.questions.set(created_questions)
        return response.Response()
