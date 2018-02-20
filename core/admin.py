from django.contrib import admin

from . import models


@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Test)
class TestAdmin(admin.ModelAdmin):
    pass
