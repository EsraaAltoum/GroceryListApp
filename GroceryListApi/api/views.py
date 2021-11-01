from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import GroceryItem
from django.shortcuts import get_object_or_404
from .serializers import GroceryItemSerializer
# Create your views here.


#defining grocery item viewset
class GroceryItemViewSet(viewsets.ModelViewSet):
    queryset = GroceryItem.objects.all() #defining query set
    serializer_class = GroceryItemSerializer #defining serializer

    #Post endpoint for adding an item to the grocery list
    @action(detail=False, methods=['POST'], url_path="add", url_name="add")
    def add_item(self, request, pk=None):
        #if request or request body is null return bad request
        if not request or not request.data:
            response = {'message': '[INVALID REQUEST] No item information found'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        # if item name is not provided return bad request
        if 'name' not in request.data:
            response = {'message': '[INVALID REQUEST] Item name must be provided'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        name = request.data['name']

        #if quantity is not provided return bad request
        if 'quantity' not in request.data:
            response = {'message': '[INVALID REQUEST] Item quantity must be provided'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        quantity = request.data['quantity']

        #creating grocery item
        notes = request.data['notes'] if 'notes' in request.data else ""
        unit = request.data['unit'] if 'unit' in request.data else ""
        GroceryItem.objects.create(name=name, notes=notes, quantity=quantity, unit=unit, purchased=False)
        response = {'message': '[SUCCESS] Item created successfully'}
        return Response(response, status=status.HTTP_200_OK)

    #delete endpoint for removing an item from grocery list
    @action(detail=False, methods=['DELETE'], url_path="delete", url_name="delete")
    def delete_item(self, request, pk=None):
        # if request or request body is null or id not present, return bad request
        if not request or not request.data or 'id' not in request.data:
            response = {'message': '[INVALID REQUEST] No item id found'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        #find grocery item by id and delete
        id = request.data['id']
        item = get_object_or_404(klass=GroceryItem, id=id)
        item.delete()
        response = {'message': '[SUCCESS] Item removed successfully'}
        return Response(response, status=status.HTTP_200_OK)

    #Put endpoint for editing an item on the grocery list
    @action(detail=False, methods=['PUT'], url_path="edit", url_name="edit")
    def edit_item(self, request, pk=None):
        # if request or request body is null or id not present return bad request
        if not request or not request.data:
            response = {'message': '[INVALID REQUEST] Item cannot be updated'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        if 'id' not in request.data:
            response = {'message': '[INVALID REQUEST] Item id must be provided'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        id = request.data['id']
        notes = request.data['notes'] if 'notes' in request.data else None
        unit = request.data['unit'] if 'unit' in request.data else None
        name = request.data['name'] if 'name' in request.data else None
        quantity = request.data['quantity'] if 'quantity' in request.data else None
        purchased = request.data['purchased'] if 'purchased' in request.data else None

        #if no new information, return bad request
        if not (name or notes or unit or quantity or purchased):
            response = {'message': '[INVALID REQUEST] No new information provided for update'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        #get item by id and update properties
        item = get_object_or_404(klass=GroceryItem, id=id)
        if name:
            item.name = name
        if notes:
            item.notes = notes
        if quantity:
            item.quantity = quantity
        if unit:
            item.unit = unit
        if purchased:
            item.purchased = purchased

        item.save()
        response = {'message': '[SUCCESS] Item updated successfully'}
        return Response(response, status=status.HTTP_200_OK)

    #put endpoint for marking an item as purchased
    @action(detail=False, methods=['PUT'], url_path="purchase", url_name="purchase")
    def purchase_item(self, request, pk=None):
        # if request or request body is null or id not present return bad request
        if not request or not request.data or 'id' not in request.data:
            response = {'message': '[INVALID REQUEST] Please provide item ID'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        #get item by id
        id = request.data['id']
        item = get_object_or_404(klass=GroceryItem, id=id)

        #if item is already purchased return bad request
        if item.purchased:
            response = {'message': '[INVALID REQUEST] Item has already been purchased'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        #else, mark item as purchased
        item.purchased = True
        item.save()
        response = {'message': '[SUCCESS] Item purchased successfully'}
        return Response(response, status=status.HTTP_200_OK)






