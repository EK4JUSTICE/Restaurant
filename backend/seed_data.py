import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

if __name__ == '__main__':
    import django
    django.setup()
    
    from api.models import MenuItem
    
    items = [
        {'name': 'Margherita Pizza', 'description': 'Fresh tomatoes, mozzarella, basil', 'price': 12.99, 'category': 'Mains', 'image': None},
        {'name': 'Caesar Salad', 'description': 'Romaine, parmesan, croutons', 'price': 8.99, 'category': 'Starters', 'image': None},
        {'name': 'Tiramisu', 'description': 'Classic Italian dessert', 'price': 6.99, 'category': 'Desserts', 'image': None},
        {'name': 'Cola', 'description': 'Refreshing soft drink', 'price': 2.99, 'category': 'Drinks', 'image': None},
    ]
    
    created = 0
    for item in items:
        obj, is_new = MenuItem.objects.get_or_create(name=item['name'], defaults=item)
        if is_new:
            created += 1
    
    print(f'Created {created} menu items')