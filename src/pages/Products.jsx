"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 15000000 });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isCredit, setIsCredit] = useState(false);
  const [isDiscounted, setIsDiscounted] = useState(false);

  const API_URLS = {
    categories: "http://192.168.100.22:8000/api/products/categories/",
    brands: "http://192.168.100.22:8000/api/products/brands/",
    products: "http://192.168.100.22:8000/api/products/products/",
    sales: "http://192.168.100.22:8000/api/products/sales/",
  };

  const sortOptions = [
    { value: "name", label: "Nomi bo'yicha" },
    { value: "price-low", label: "Narxi: pastdan yuqoriga" },
    { value: "price-high", label: "Narxi: yuqoridan pastga" },
    { value: "rating", label: "Reytingi bo'yicha" },
    { value: "newest", label: "Eng yangilari" },
  ];

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(API_URLS.categories);
        const fetchedCategories = [
          { id: "all", name: "Barcha kategoriyalar", count: 0 },
          ...categoriesResponse.data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            count: 0, // Will update after fetching products
          })),
        ];

        // Fetch brands
        const brandsResponse = await axios.get(API_URLS.brands);
        const fetchedBrands = brandsResponse.data.map((brand) => brand.name);

        // Fetch products
        const productsResponse = await axios.get(API_URLS.products);
        const fetchedProducts = productsResponse.data;

        // Fetch sales (for discounts)
        const salesResponse = await axios.get(API_URLS.sales);
        const salesData = salesResponse.data;

        // Merge sales data with products
        const productsWithSales = fetchedProducts.map((product) => ({
          ...product,
          discount: salesData.find((sale) => sale.product_id === product.id)?.discount || 0,
        }));

        // Update category counts
        const updatedCategories = fetchedCategories.map((cat) => {
          if (cat.id === "all") {
            return { ...cat, count: fetchedProducts.length };
          }
          return {
            ...cat,
            count: fetchedProducts.filter((p) => p.category === cat.id).length,
          };
        });

        setProducts(productsWithSales);
        setFilteredProducts(productsWithSales);
        setCategories(updatedCategories);
        setBrands(fetchedBrands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
    }

    // Filter by credit availability
    if (isCredit) {
      filtered = filtered.filter((product) => product.isCredit);
    }

    // Filter by discount
    if (isDiscounted) {
      filtered = filtered.filter((product) => product.discount > 0);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, selectedBrands, isCredit, isDiscounted]);

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  // Handle brand filter change
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Mahsulotlar</h1>
          <p>Eng sifatli maishiy texnikalar va eng qulay narxlar</p>
        </div>

        {/* Search and Filters Bar */}
        <div className="filters-bar">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Mahsulot yoki brend nomi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-controls">
            <button
              className={`filter-toggle ${showFilters ? "active" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filtrlar
            </button>

            <div className="sort-container">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="sort-icon" />
            </div>

            <div className="view-controls">
              <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
                <Grid size={18} />
              </button>
              <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? "show" : ""}`}>
            <div className="filter-section">
              <h3>Kategoriyalar</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Narx oralig'i</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                  className="price-slider"
                />
                <div className="price-inputs">
                  <input
                    type="number"
                    name="min"
                    placeholder="Dan"
                    value={priceRange.min}
                    onChange={handlePriceRangeChange}
                    className="price-input"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="Gacha"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                    className="price-input"
                  />
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>Brendlar</h3>
              <div className="brand-list">
                {brands.map((brand) => (
                  <label key={brand} className="brand-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Xususiyatlar</h3>
              <div className="features-list">
                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={isCredit}
                    onChange={() => setIsCredit(!isCredit)}
                  />
                  <span>Kredit mavjud</span>
                </label>
                <label className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={isDiscounted}
                    onChange={() => setIsDiscounted(!isDiscounted)}
                  />
                  <span>Chegirmada</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            <div className="products-header">
              <span className="results-count">{filteredProducts.length} mahsulot topildi</span>
            </div>

            <div className={`products-grid ${viewMode}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="no-results">
                <h3>Hech qanday mahsulot topilmadi</h3>
                <p>Qidiruv shartlarini o'zgartirib ko'ring</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;