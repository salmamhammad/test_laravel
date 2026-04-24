<?php
namespace App\Repositories;

use App\Interfaces\ProductRepositoryInterface;
use App\Models\Product;

class ProductRepository implements ProductRepositoryInterface
{
    public function getFilteredProducts(array $filters)
    {
        $query = Product::with('category:id,name');
        // список фильтров
        //фильтр: q
        if (! empty($filters['q'])) {
            $query->where('name', 'LIKE', "%{$filters['q']}%");
        }
        //фильтр: price_from, price_to
        if (! empty($filters['price_from'])) {
            $query->where('price', '>=', $filters['price_from']);
        }

        if (! empty($filters['price_to'])) {
            $query->where('price', '<=', $filters['price_to']);
        }
        //фильтр: category_id
        if (! empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }
        //фильтр: in_stock (true/false)
        if (array_key_exists('in_stock', $filters) && $filters['in_stock'] !== null && $filters['in_stock'] !== '') {
            $query->where('in_stock', filter_var($filters['in_stock'], FILTER_VALIDATE_BOOLEAN));
        }
        //фильтр: rating_from
        if (! empty($filters['rating_from'])) {
            $query->where('rating', '>=', min(5, max(0, (float) $filters['rating_from'])));
        }
        //Сортировка
        switch ($filters['sort'] ?? 'newest') {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;

            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;

            case 'rating_desc':
                $query->orderBy('rating', 'desc');
                break;

            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
        //Пагинация
        $perPage = isset($filters['per_page']) ? (int) $filters['per_page'] : 10;

        return $query->paginate($perPage);
    }
}
