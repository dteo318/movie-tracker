from django.shortcuts import render

# Create your views here.
def watched_list_view(request):
    return render(request, 'tracker/watched_list.html')