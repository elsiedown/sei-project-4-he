# Generated by Django 3.1.5 on 2021-01-26 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='description',
            field=models.CharField(max_length=450),
        ),
    ]
