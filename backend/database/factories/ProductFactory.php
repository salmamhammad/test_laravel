<?php
namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'        => $this->faker->words(3, true),
            'price'       => $this->faker->randomFloat(2, 10, 1000),
            'category_id' => Category::factory(),
            'in_stock'    => $this->faker->boolean(),
            'rating'      => $this->faker->randomFloat(1, 0, 5),
        ];
    }
}
