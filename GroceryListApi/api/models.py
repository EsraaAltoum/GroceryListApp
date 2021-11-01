from django.db import models


# grocery item class defined
class GroceryItem(models.Model):
    name = models.CharField(max_length=32) #item name ie. 'apple'
    notes = models.TextField(max_length=360, blank=True) #item note ie. 'organic apple'
    quantity = models.FloatField() #item quantity ie. 3
    unit = models.CharField(max_length=32, blank=True) #item unit ie. 'kg, lb ..'
    purchased = models.BooleanField(default=False) #if item is purchased, initialized as false

