"use client";

import { useState, useEffect } from "react";
import { Clock, Percent, Filter } from "lucide-react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/sales.css";

const Sales = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("discount-high");
  const [filterCategory, setFilterCategory] = useState("all");

  const API_URLS = {
    categories: "http://192.168.100.22:8000/api/products/categories/",
    products: "http://192.168.100.22:8000/api/products/products/",
    sales: "http://192.168.100.22:8000/api/products/sales/",
  };

  const sortOptions = [
    { value: "discount-high", label: "Chegirma: yuqoridan pastga" },
    { value: "discount-low", label: "Chegirma: pastdan yuqoriga" },
    { value: "price-low", label: "Narx: pastdan yuqoriga" },
    { value: "price-high", label: "Narx: yuqoridan pastga" },
    { value: "ending-soon", label: "Tez tugaydiganlar" },
  ];

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(API_URLS.categories);
        const fetchedCategories = [
          { id: "all", name: "Barcha kategoriyalar" },
          ...categoriesResponse.data.map((cat) => ({
            id: cat.id,
            name: cat.name,
          })),
        ];

        // Fetch products
        const productsResponse = await axios.get(API_URLS.products);
        const fetchedProducts = productsResponse.data;

        // Fetch sales
        const salesResponse = await axios.get(API_URLS.sales);
        const salesData = salesResponse.data;

        // Filter products that are on sale and merge with sales data
        const productsOnSale = fetchedProducts
          .filter((product) => salesData.some((sale) => sale.product_id === product.id))
          .map((product) => {
            const sale = salesData.find((sale) => sale.product_id === product.id);
            return {
              ...product,
              discount: sale.discount,
              saleEndDate: sale.end_date,
              originalPrice: product.price / (1 - sale.discount / 100),
            };
          });

        setSaleProducts(productsOnSale);
        setFilteredProducts(productsOnSale);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...saleProducts];

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    // Sort products
    switch (sortBy) {
      case "discount-high":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "discount-low":
        filtered.sort((a, b) => a.discount - b.discount);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "ending-soon":
        filtered.sort((a, b) => new Date(a.saleEndDate) - new Date(b.saleEndDate));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [saleProducts, sortBy, filterCategory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysLeft = (dateString) => {
    const today = new Date();
    const endDate = new Date(dateString);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(Math.round(price)) + " so'm";
  };

  return (
    <div className="sales-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Chegirmalar</h1>
          <p>Eng yaxshi takliflar va chegirmalar - cheklangan vaqt!</p>
        </div>

        {/* Sale Banner */}
        <div className="sale-banner">
          <div className="banner-content">
            <div className="banner-text">
              <h2>Katta Chegirmalar Festivali!</h2>
              <p>50% gacha chegirmalar barcha kategoriyalarda</p>
              <div className="banner-features">
                <div className="feature">
                  <Percent size={20} />
                  <span>50% gacha chegirma</span>
                </div>
                <div className="feature">
                  <Clock size={20} />
                  <span>Cheklangan vaqt</span>
                </div>
              </div>
            </div>
            <div className="banner-image">
              <img src="/sale-banner-electronics.png" alt="Chegirmalar" />
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="controls-bar">
          <div className="category-filter">
            <Filter size={18} />
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-control">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sale Products Grid */}
        <div className="sale-products">
          <div className="products-count">
            <span>{filteredProducts.length} ta chegirmadagi mahsulot</span>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="sale-product-card">
                <ProductCard product={product} showDiscount={true} />
                <div className="sale-info">
                  <div className="discount-info">
                    <span className="discount-percent">{product.discount}% chegirma</span>
                    <span className="savings">{formatPrice(product.originalPrice - product.price)} tejash</span>
                  </div>
                  <div className="sale-timer">
                    <Clock size={16} />
                    <span className={`days-left ${getDaysLeft(product.saleEndDate) <= 3 ? "urgent" : ""}`}>
                      {getDaysLeft(product.saleEndDate) > 0
                        ? `${getDaysLeft(product.saleEndDate)} kun qoldi`
                        : "Tugagan"}
                    </span>
                  </div>
                  <div className="sale-end-date">Tugash sanasi: {formatDate(product.saleEndDate)}</div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <h3>Hech qanday chegirmadagi mahsulot topilmadi</h3>
              <p>Boshqa kategoriyani tanlang yoki filtrlarni o'zgartiring</p>
            </div>
          )}
        </div>

        {/* Sale Terms */}
        <div className="sale-terms">
          <h2>Chegirma shartlari</h2>
          <div className="terms-grid">
            <div className="term-item">
              <h3>Chegirma muddati</h3>
              <p>Barcha chegirmalar cheklangan vaqt uchun amal qiladi va ko'rsatilgan sanagacha davom etadi.</p>
            </div>
            <div className="term-item">
              <h3>Kredit imkoniyati</h3>
              <p>Chegirmadagi mahsulotlarni ham kreditga olish mumkin. 0% foiz bilan 12 oygacha.</p>
            </div>
            <div className="term-item">
              <h3>Yetkazib berish</h3>
              <p>1 mln so'mdan yuqori xaridlarga bepul yetkazib berish xizmati.</p>
            </div>
            <div className="term-item">
              <h3>Kafolat</h3>
              <p>Barcha chegirmadagi mahsulotlarga ham 2 yillik kafolat beriladi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;