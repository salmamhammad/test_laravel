import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "./api";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
    loadProducts(filters);
  }, []);

  const loadProducts = async (customFilters = filters) => {
    const res = await fetchProducts(customFilters);

    setProducts(res.data.data);

    setPagination({
      current_page: res.data.current_page,
      last_page: res.data.last_page,
    });
  };

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value,
      page: 1,
    };

    setFilters(newFilters);
  };

  const goToPage = (page) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    loadProducts(newFilters);
  };

  return (
    <div className="container">

      <h2 className="title">Product Dashboard</h2>

      {/* FILTERS */}
      <div className="filter-box">

        <input name="q" placeholder="Search..." onChange={handleChange} className="input" />

        <input name="price_from" placeholder="Min price" onChange={handleChange} className="input" />

        <input name="price_to" placeholder="Max price" onChange={handleChange} className="input" />

        <select name="category_id" onChange={handleChange} className="input">
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select name="in_stock" onChange={handleChange} className="input">
          <option value="">All Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out</option>
        </select>

        <input
          name="rating_from"
          placeholder="Min rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          onChange={handleChange}
          className="input"
        />

        <button onClick={() => loadProducts(filters)} className="btn">
          Apply
        </button>

        {/* SORTING */}
        <select
          value={filters.sort}
          onChange={(e) => {
            const newFilters = { ...filters, sort: e.target.value, page: 1 };
            setFilters(newFilters);
            loadProducts(newFilters);
          }}
          className="input"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="rating_desc">Rating</option>
        </select>

      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category?.name}</td>
              <td>${p.price}</td>
              <td>{p.in_stock ? "Yes" : "No"}</td>
              <td>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={pagination.current_page === 1}
          onClick={() => goToPage(pagination.current_page - 1)}
        >
          Prev
        </button>

        <span>
          Page {pagination.current_page} / {pagination.last_page}
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