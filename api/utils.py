from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.conf import settings

class BaseDBView(APIView):
    model_class = None
    serializer_class = None

    
    def format_image_url(self, image_path):
        # Ensure the correct file extension
        if image_path:
            return f"{settings.MEDIA_URL}product_images/{image_path}"
        return None

    def post(self, request, index=None):
        if index is not None:
            try:
                obj = self.model_class.objects.get(id=index)
            except self.model_class.DoesNotExist:
                raise NotFound("Data not found")

            serializer = self.serializer_class(obj, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, index=None):
        if index is not None:
            try:
                obj = self.model_class.objects.get(id=index)
                serializer = self.serializer_class(obj)
                # Modify the response to include the correct image URL
                data = serializer.data
                if 'image' in data:
                    data['image'] = self.format_image_url(data['image'])
                return Response(data)
            except self.model_class.DoesNotExist:
                raise NotFound("Data not found")
        else:
            query = request.GET.get('search', '')
            queryset = self.model_class.objects.filter(title__icontains=query)
            serializer = self.serializer_class(queryset, many=True)
            data = serializer.data
            # Modify the response to include the correct image URLs
            for item in data['results']:
                if 'image' in item:
                    item['image'] = self.format_image_url(item['image'])
            return Response({'results': data})

    def delete(self, request, index):
        try:
            obj = self.model_class.objects.get(id=index)
        except self.model_class.DoesNotExist:
            raise NotFound("Data not found")
        
        obj.delete()
        return Response({'message': 'Data deleted successfully'}, status=status.HTTP_204_NO_CONTENT)