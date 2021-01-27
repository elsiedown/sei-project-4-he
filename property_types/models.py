from django.db import models

# Create your models here.

class PropertyType(models.Model):
    name = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name}"
