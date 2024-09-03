import shutil
import os

# Path to the original image
original_image_path = 'media\img_1.jpg'

# Directory to save the new images
output_directory = 'media\product_images'
os.makedirs(output_directory, exist_ok=True)

# Copy and rename the image 100 times
for i in range(1, 101):
    new_image_name = f'img_{i}.jpg'  # Change extension if needed
    new_image_path = os.path.join(output_directory, new_image_name)
    shutil.copy(original_image_path, new_image_path)

print("Images copied and renamed successfully!")
