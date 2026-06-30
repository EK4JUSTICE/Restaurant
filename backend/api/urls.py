from django.urls import path
from .views import menu_items, create_menu_item, create_order, register_user, login_user, orders_list, users_list, update_user_role

urlpatterns = [
    path('menu/', menu_items),
    path('menu/create/', create_menu_item),
    path('orders/', create_order),
    path('orders/list/', orders_list),
    path('auth/register/', register_user),
    path('auth/login/', login_user),
    path('users/', users_list),
    path('users/<int:user_id>/role/', update_user_role),
]