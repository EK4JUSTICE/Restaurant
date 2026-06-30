from api.models import MenuItem  
items = [  
    {'name': 'Margherita Pizza', 'description': 'Fresh tomatoes, mozzarella, basil', 'price': 12.99, 'category': 'Mains'},  
    {'name': 'Caesar Salad', 'description': 'Romaine, parmesan, croutons', 'price': 8.99, 'category': 'Starters'},  
    {'name': 'Tiramisu', 'description': 'Classic Italian dessert', 'price': 6.99, 'category': 'Desserts'},  
    {'name': 'Cola', 'description': 'Refreshing soft drink', 'price': 2.99, 'category': 'Drinks'},  
]  
for item in items:  
    MenuItem.objects.get_or_create(name=item['name'], defaults=item)  
