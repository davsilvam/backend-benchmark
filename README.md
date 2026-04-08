# 1. Setup do Projeto

Projeto criado e versionado no GitHub.

---

# 2. Criação do docker-compose.yml e dos contratos da API com o OpenAPI

O `docker-compose.yml` foi criado para provisionar o PostgreSQL como base de dados compartilhada entre os frameworks.

O contrato da API foi definido utilizando o padrão **OpenAPI**, e o arquivo de especificação foi salvo como `openapi.yaml`, garantindo padronização dos endpoints entre as implementações.

---

# 3. Setup dos frameworks

## 3.1 Spring Boot

O Spring Boot foi iniciado com o Spring Initializr, utilizando uma versão estável do ecossistema Spring.

- Project: Maven
- Language: Java
- Spring Boot: **3.3.x (versão estável)**
- Grupo: com.benchmark
- Artefato: spring
- Nome do pacote: com.benchmark.spring
- Packaging: Jar
- Configuration: YAML
- Java: **21 (LTS)**
- Dependências: Spring Web, Spring Data JPA, PostgreSQL Driver

---

## 3.2 NestJS

O NestJS foi iniciado utilizando o Nest CLI, baseado no runtime Node.js.

- Nest CLI: 11.0.18
- Project Name: nestjs
- Package Manager: npm
- NestJS: **11.x (versão estável atual)**
- Node.js: **20.x (LTS)**

---

## 3.3 Django

O Django foi iniciado utilizando o `django-admin`.

- Python: **3.12 (estável/LTS de fato na prática)**
- Django: **5.2.x (LTS)**

---

## 3.4 Laravel

O Laravel foi instalado via Composer, seguindo a política de suporte do framework.

- PHP: **8.3 (estável)**
- Composer: **2.9.5**
- Laravel: **12.x (versão estável dentro do ciclo completo de suporte)**

---

## 3.5 ASP.NET Core

O ASP.NET Core foi instalado utilizando o SDK oficial da Microsoft.

- .NET SDK: **8.0.x (LTS)**
- .NET Runtime: **8.0.x (LTS)**
- ASP.NET Core Runtime: **8.0.x (LTS)**
