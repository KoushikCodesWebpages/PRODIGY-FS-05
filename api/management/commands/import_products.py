import csv
from django.core.management.base import BaseCommand
from api.models import Product  # Import your Product model

class Command(BaseCommand):
    help = 'Import products from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to the CSV file')

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        with open(csv_file_path, 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                Product.objects.create(
                    title=row['title'],
                    description=row['description'],
                    status=row['status'],
                    price=row['price'],
                    stock=row['stock'],
                    image=row['image']
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported products'))
