# Generated by Django 2.0.2 on 2018-02-25 14:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_question_complement'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='answer',
            options={'ordering': ['?']},
        ),
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['?']},
        ),
    ]
