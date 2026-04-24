# test_laravel

## Tech Stack
- Backend: PHP (Laravel)
- Frontend: React.js

## Обзор
Этот проект представляет собой простой API для управления продуктами с интерфейсом на React.

### Products
- `GET /api/products`  
  Возвращает постраничный список товаров с возможностью фильтрации и сортировки.

### Categories
- `GET /api/categories`  
  Возвращает список всех категорий товаров.

---

## Функции

###  Product Search & Filters
Конечная точка `/api/products` поддерживает следующие параметры запроса:

- `q` → Поиск товаров по названию (поиск по подстроке)
- `price_from` → фильтр минимальной цены
- `price_to` →  фильтр максимальной цены
- `category_id` →  фильтр по категории (selected by ID)
- `in_stock` → фильтр по наличию (true/false)
- `rating_from` →  фильтр минимального рейтинга (0–5)

---

###  Sorting
Параметр `sort` поддерживает следующие значения:
- `price_asc` → сортировка по цене (от низкой к высокой)
- `price_desc` → сортировка по цене (от высокой к низкой)
- `rating_desc` → сортировка по рейтингу (от самого высокого к самому низкому)
- `newest` → сортировка по новизне товаров

---

### Pagination
- Все результаты поиска товаров отображаются с постраничной разбивкой.
- По умолчанию для всех запросов применяется постраничная разбивка.

---

## Data Flow
Фронтенд (React.js) взаимодействует с бэкендом (Laravel API) посредством HTTP-запросов к:
- fetch products
- apply filters
- sort results
- handle pagination

Данные передаются и принимаются в формате JSON.
---
## setup : backend
- composer install
- php artisan migrate
- php artisan db:seed
- php artisan serve
## setup : frontend
- npm install
- npm start
