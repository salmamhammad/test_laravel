import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "./api";


function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    price_from: "",
    price_to: "",
    category_id: "",
    in_stock: "",
    rating_from: "",
    sort: "newest",
  });
const [categories, setCategories] = useState([]);
useEffect(() => {
  fetchCategories().then(res => setCategories(res.data));
}, []);
  const loadProducts = async () => {
    const res = await fetchProducts(filters);
    setProducts(res.data.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      {/* Filters */}
      <input name="q" placeholder="Search" onChange={handleChange} />
      <input name="price_from" placeholder="Min price" onChange={handleChange} />
      <input name="price_to" placeholder="Max price" onChange={handleChange} />
      <select name="category_id" onChange={handleChange}>
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select name="in_stock" onChange={handleChange}>
         <option value="">All</option>
         <option value="true">In Stock</option>
         <option value="false">Out of Stock</option>
      </select>
      <select name="sort" onChange={handleChange}>
        <option value="newest">Newest</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="rating_desc">Rating</option>
      </select>
      <input
        name="rating_from"
        placeholder="Min rating (0-5)"
        type="number"
        step="0.1"
        min="0"
        max="5"
        onChange={handleChange}
      />
      <button onClick={loadProducts}>Apply</button>

      {/* List */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - price: ${p.price} - rate: {p.rating}  - {p.category?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;