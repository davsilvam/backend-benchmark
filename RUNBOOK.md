# Runbook de Execução e Validação

Este guia padroniza como subir cada app e validar equivalência de contrato
antes do benchmarking.

## 1) Pré-requisitos

- Docker Desktop ativo
- PostgreSQL do `docker-compose.yml` em execução
- Portas livres: `3000`, `5000` ou `8080`, `8000`

Subir banco:

```powershell
docker compose up -d db
```

## 2) Smoke test padrão

Script de validação:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "<BASE_URL>"
```

Endpoints validados:

- `GET /api/health`
- `GET /api/compute?n=10`
- `GET /api/users`
- `GET /api/users/raw`
- `POST /api/users`

## 3) Execução por framework

Use um app por vez e rode o smoke test em seguida.

### Spring (porta 8080)

```powershell
./apps/spring/mvnw.cmd -f "apps/spring/pom.xml" spring-boot:run
```

Teste:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "http://localhost:8080"
```

### NestJS (porta 3000)

```powershell
npm --prefix "apps/nestjs" install
npm --prefix "apps/nestjs" run start
```

Teste:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "http://localhost:3000"
```

### Django (porta 8000)

Preparação do venv local do app:

```powershell
python -m venv "apps/django/.venv"
apps/django/.venv/Scripts/python.exe -m pip install -r "apps/django/requirements.txt"
apps/django/.venv/Scripts/python.exe "apps/django/manage.py" migrate
```

Opção A (desenvolvimento):

```powershell
apps/django/.venv/Scripts/python.exe "apps/django/manage.py" runserver 8000
```

Opção B (mais próxima de produção):

```powershell
apps/django/.venv/Scripts/gunicorn.exe project.wsgi:application --chdir "apps/django" --bind 0.0.0.0:8000 --workers 2
```

Teste:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "http://localhost:8000"
```

### Laravel (porta 8000)

Configurar `apps/laravel/.env` para usar o banco local:

```env
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=benchmark
DB_USERNAME=benchmark
DB_PASSWORD=benchmark

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

Subir app:

```powershell
php "apps/laravel/artisan" config:clear
php "apps/laravel/artisan" migrate
php "apps/laravel/artisan" serve --host=0.0.0.0 --port=8000
```

Teste:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "http://localhost:8000"
```

### .NET (porta 8080)

Primeira compilação:

```powershell
dotnet restore "apps/dotnet/dotnet.csproj"
dotnet build "apps/dotnet/dotnet.csproj" -c Release --no-restore
```

Execução:

```powershell
$env:ASPNETCORE_URLS="http://0.0.0.0:8080"
dotnet run --project "apps/dotnet/dotnet.csproj" -c Release --no-build --no-restore --no-launch-profile
```

Teste:

```powershell
pwsh ./smoke-test.ps1 -BaseUrl "http://localhost:8080"
```

## 4) Encerramento

Parar banco:

```powershell
docker compose stop db
```

## 5) Status de benchmark

Benchmark de performance ainda não iniciado neste runbook.
Este documento cobre apenas baseline de execução e equivalência funcional.
