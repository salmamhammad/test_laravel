<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
class Product extends Model
{
    //
      protected $fillable = [
        'name', 'price', 'category_id', 'in_stock', 'rating'
    ];
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
