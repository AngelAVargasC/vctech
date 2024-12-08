from django.shortcuts import render
from django.http import JsonResponse
from .listproduct import products

def home_page(request):
    return  render(request,'vctech_app/homepage.html')


def store_web(request):
    return render(request, 'vctech_app/store_vctech.html')

def get_products(request):
    category = request.GET.get('category', '')
    search_query = request.GET.get('search_query', '')

    filtered_products = [p for p in products if (category.lower() in p['category'].lower()) and (search_query.lower() in p['name'].lower())]

    return JsonResponse(filtered_products, safe=False)