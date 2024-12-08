from django.urls import path
from . import views


urlpatterns = [
    path('', views.home_page,name='templates/vctech_app/homepage'),  # Ruta de ejemplo
    path('productos', views.store_web, name= 'templates/vctech_app/store_vctech'),
    path('api/products/', views.get_products, name='get_products'),

]