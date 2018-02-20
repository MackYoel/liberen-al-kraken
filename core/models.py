from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager


class Question(models.Model):

    tittle = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    tags = TaggableManager(blank=True)

    def __str__(self):
        return self.tittle[:20]


class Answer(models.Model):

    content = models.TextField()
    is_right = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.content[:20]


class Test(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return f'{self.user.username} - [{self.score}] pts'
