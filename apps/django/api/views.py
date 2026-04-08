import json

from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User


def health(request):
    return JsonResponse({"status": "ok"})


def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


def compute(request):
    n = int(request.GET.get("n", 40))
    return JsonResponse({"result": fib(n)})


@csrf_exempt
def users(request):
    if request.method == "GET":
        data = list(User.objects.values("id", "name", "email", "created_at")[:1000])
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        payload = json.loads(request.body or "{}")

        user = User.objects.create(
            name=payload["name"],
            email=payload["email"],
        )

        return JsonResponse(
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "created_at": user.created_at,
            },
            status=201,
        )


def users_raw(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, name, email, created_at FROM users LIMIT 1000")
        rows = cursor.fetchall()

    data = [
        {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "created_at": row[3],
        }
        for row in rows
    ]

    return JsonResponse(data, safe=False)
