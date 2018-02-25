from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager


class Question(models.Model):

    title = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    complement = models.TextField(null=True, blank=True)

    tags = TaggableManager(blank=True)

    class Meta:
        ordering = ['?']

    def __str__(self):
        return self.title[:20]


class Answer(models.Model):

    content = models.TextField()
    is_right = models.BooleanField(default=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    class Meta:
        ordering = ['?']

    def __str__(self):
        return self.content[:20]


class Test(models.Model):

    name = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    questions = models.ManyToManyField(Question)

    def __str__(self):
        return f'{self.name}'


class UserTest(models.Model):

    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    score = models.IntegerField()
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.test.name} - {self.user.username} - [{self.score}] pts'
