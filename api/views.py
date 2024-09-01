# myapp/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Product
from .serializers import ProductSerializer
from .utils import BaseDBView

class ProductView(BaseDBView):
    model_class = Product
    serializer_class = ProductSerializer
