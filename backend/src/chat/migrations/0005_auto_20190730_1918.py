# Generated by Django 2.2.3 on 2019-07-30 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_auto_20190730_1904'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='activity',
            field=models.CharField(default='Welcome', max_length=255),
        ),
        migrations.AlterField(
            model_name='information',
            name='city',
            field=models.CharField(default='Welcome', max_length=255),
        ),
    ]