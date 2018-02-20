from rest_framework import serializers

from . import models


class TestSerializer(serializers.ModelSerializer):

    author_display = serializers.SerializerMethodField()

    class Meta:
        model = models.Test
        fields = ('id', 'name', 'author', 'author_display')

        extra_kwargs = {
            'author': {
                'required': False
            }
        }

    def get_author_display(self, obj):
        if obj.author:
            return obj.author.username

        return 'Anonimo'


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Answer
        fields = ('id', 'content', 'is_right')


class QuestionSerializer(serializers.ModelSerializer):

    answer_set = AnswerSerializer(many=True)

    class Meta:
        model = models.Question
        fields = ('id', 'title', 'answer_set')
