<?php
namespace Tests\Feature;

use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_products_can_be_filtered()
    {
        $response = $this->get('/api/products?price_from=50');

        $response->assertStatus(200);
    }
}
