# myapp/views.py
from .models import Product
from .serializers import ProductSerializer
from .utils import BaseDBView
from .pagination import ProductPagination

class ProductView(BaseDBView):
    model_class = Product
    serializer_class = ProductSerializer
    pagination_class = ProductPagination
