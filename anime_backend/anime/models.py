from django.db import models

# Create your models here.
class Anime(models.Model):
    title = models.CharField(max_length=255)
    image = models.TextField(null=True)
    kind = models.TextField(default='TV')
    episodes = models.IntegerField(default=12)
    episodes_aired = models.IntegerField(default=12)
    score = models.TextField()

    def __str__(self):
        return self.title