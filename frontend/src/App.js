import { useEffect, useState } from "react";
import { fetchProducts } from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    q: "",
    price_from: "",
    price_to: "",
    sort: "newest",
  });

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

      <select name="sort" onChange={handleChange}>
        <option value="newest">Newest</option>
        <option value="price_asc">Price ↑</option>
        <option value="price_desc">Price ↓</option>
        <option value="rating_desc">Rating</option>
      </select>

      <button onClick={loadProducts}>Apply</button>

      {/* List */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - price: ${p.price} - rate: {p.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;