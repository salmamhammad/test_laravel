<?php
namespace App\Repositories;

use App\Models\Product;
use App\Interfaces\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    public function getFilteredProducts(array $filters)
    {
        $query = Product::with('category:id,name');
        // список фильтров
        //фильтр: q
        if (!empty($filters['q'])) {
            $query->where('name', 'LIKE', "%{$filters['q']}%");
        }
        //фильтр: price_from, price_to
        if (!empty($filters['price_from'])) {
            $query->where('price', '>=', $filters['price_from']);
        }

        if (!empty($filters['price_to'])) {
            $query->where('price', '<=', $filters['price_to']);
        }
         //фильтр: category_id
        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }
        //фильтр: in_stock (true/false)
        if (isset($filters['in_stock'])) {
            $query->where('in_stock', filter_var($filters['in_stock'], FILTER_VALIDATE_BOOLEAN));
        }
         //фильтр: rating_from
        if (!empty($filters['rating_from'])) {
            $query->where('rating', '>=', $filters['rating_from']);
        }
        //Сортировка
        switch ($filters['sort'] ?? null) {
            case 'price_asc':
                $query->orderBy('price');
                break;
            case 'price_desc':
                $query->orderByDesc('price');
                break;
            case 'rating_desc':
                $query->orderByDesc('rating');
                break;
            default:
                $query->orderByDesc('created_at');
        }
        //Пагинация
        return $query->paginate(10);
    }
}
