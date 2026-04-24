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
    page: 1,
  });
const [categories, setCategories] = useState([]);
const [pagination, setPagination] = useState({
  current_page: 1,
  last_page: 1,
});
useEffect(() => {
  fetchCategories().then(res => setCategories(res.data));
}, []);
const loadProducts = async (customFilters = filters, page = 1) => {
  const res = await fetchProducts({
    ...customFilters,
    page, 
  });

  setProducts(res.data.data);

  setPagination({
    current_page: res.data.current_page,
    last_page: res.data.last_page,
  });
};

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value ,page: 1});
  };
const goToPage = (page) => {
  const newFilters = { ...filters, page };
  setFilters(newFilters);
  loadProducts(newFilters, page);
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
      <input
        name="rating_from"
        placeholder="Min rating (0-5)"
        type="number"
        step="0.1"
        min="0"
        max="5"
        onChange={handleChange}
      />
      <button onClick={() => loadProducts()}>Apply</button>
        <br/>
        <select
          value={filters.sort}
          onChange={(e) => {
            const newFilters = { ...filters, sort: e.target.value };
            setFilters(newFilters);
            loadProducts(newFilters); // 🔥 immediate request
          }}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="rating_desc">Rating</option>
        </select>
      {/* List */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - price: ${p.price} - rate: {p.rating}  - {p.category?.name}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 20 }}>
        <button
          disabled={pagination.current_page === 1}
          onClick={() => goToPage(pagination.current_page - 1)}
        >
          Prev
        </button>

        <span>
          Page {pagination.current_page} of {pagination.last_page}
        </span>

        <button
          disabled={pagination.current_page === pagination.last_page}
          onClick={() => goToPage(pagination.current_page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;