from rest_framework import serializers
from .models import Product
import os

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        if obj.image:
            # Return only the filename
            return os.path.basename(obj.image.name)
        return None
