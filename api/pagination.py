# myapp/pagination.py

from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 16  # Default page size for products

class CartPagination(PageNumberPagination):
    page_size = 6  # Default page size for cart items
