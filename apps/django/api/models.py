from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=150, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "users"
