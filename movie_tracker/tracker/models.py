from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=200)
    overview = models.CharField(max_length=500)
    movie_id = models.IntegerField()
    release_date = models.CharField(max_length=10)
    runtime = models.IntegerField()

    def __str__(self):
        return self.title