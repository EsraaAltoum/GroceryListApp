from rest_framework import serializers
from .models import GroceryItem

#serializer for grocery item objects
class GroceryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryItem
        fields = ('id', 'name', 'notes', 'quantity', 'unit', 'purchased')
