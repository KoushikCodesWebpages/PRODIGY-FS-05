# myapp/views.py
from .models import Product
from .serializers import ProductSerializer
from .utils import BaseDBView

class ProductView(BaseDBView):
    model_class = Product
    serializer_class = ProductSerializer
