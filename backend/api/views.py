from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
import json
from .models import MenuItem, Order

def menu_items(request):
    items_queryset = MenuItem.objects.all()
    items = []
    
    for obj in items_queryset:
        image_url = ""
        if obj.image:
            image_url = request.build_absolute_uri(obj.image.url)
            
        items.append({
            'id': obj.id,
            'name': obj.name,
            'description': obj.description,
            'price': float(obj.price),
            'category': obj.category,
            'image': image_url
        })
        
    return JsonResponse(items, safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def create_menu_item(request):
    data = request.POST
    image = request.FILES.get('image')
    try:
        menu_item = MenuItem.objects.create(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            category=data['category'],
            image=image
        )
        return JsonResponse({'id': menu_item.id, 'message': 'Menu item created successfully'}, status=201)
    except KeyError as e:
        return JsonResponse({'message': f'Missing required field: {e.args[0]}'}, status=400)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def create_order(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError) as e:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    
    try:
        order = Order.objects.create(
            customer_name=data['customer']['name'],
            customer_email=data['customer']['email'],
            customer_phone=data['customer']['phone'],
            customer_address=data['customer']['address'],
            payment_method=data['customer']['paymentMethod'],
            items=json.dumps(data['items']),
            total=data['total']
        )
        return JsonResponse({'id': order.id, 'message': 'Order created successfully'}, status=201)
    except KeyError as e:
        return JsonResponse({'message': f'Missing required field: {e.args[0]}'}, status=400)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError) as e:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    
    try:
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data.get('name', '')
        )
        return JsonResponse({'message': 'User created successfully'}, status=201)
    except KeyError as e:
        return JsonResponse({'message': f'Missing required field: {e.args[0]}'}, status=400)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError) as e:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    
    try:
        user = authenticate(username=data['email'], password=data['password'])
        if user:
            return JsonResponse({
                'token': 'dummy-token', 
                'user': {
                    'id': user.id, 
                    'name': user.first_name, 
                    'email': user.email,
                    'is_staff': user.is_staff
                }
            })
        return JsonResponse({'message': 'Invalid credentials'}, status=401)
    except KeyError as e:
        return JsonResponse({'message': f'Missing required field: {e.args[0]}'}, status=400)

def orders_list(request):
    orders = Order.objects.all().order_by('-created_at')
    data = []
    for order in orders:
        data.append({
            'id': order.id,
            'customer_name': order.customer_name,
            'customer_email': order.customer_email,
            'customer_phone': order.customer_phone,
            'customer_address': order.customer_address,
            'payment_method': order.payment_method,
            'items': order.items,
            'total': float(order.total),
            'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        })
    return JsonResponse(data, safe=False)

def users_list(request):
    users = User.objects.all().order_by('id')
    data = []
    for user in users:
        data.append({
            'id': user.id,
            'name': user.first_name,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'date_joined': user.date_joined.strftime('%Y-%m-%d %H:%M:%S')
        })
    return JsonResponse(data, safe=False)

def update_user_role(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'message': 'User not found'}, status=404)

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return JsonResponse({'message': 'Invalid JSON'}, status=400)

    role = data.get('role', 'customer')
    if role == 'admin':
        user.is_staff = True
        user.is_superuser = True
    elif role == 'staff':
        user.is_staff = True
        user.is_superuser = False
    else:
        user.is_staff = False
        user.is_superuser = False

    user.save()
    return JsonResponse({
        'message': 'Role updated successfully',
        'user': {
            'id': user.id,
            'name': user.first_name,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser
        }
    })
