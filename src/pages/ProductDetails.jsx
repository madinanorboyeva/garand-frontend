"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react"
import "../styles/product-details.css"

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [creditMonths, setCreditMonths] = useState(12)
  const [showCreditCalculator, setShowCreditCalculator] = useState(false)

  // Mock product data - in real app this would come from API
  const mockProducts = {
    1: {
      id: 1,
      name: 'Samsung 55" 4K Smart TV',
      price: 8500000,
      oldPrice: 9500000,
      discount: 11,
      category: "televizor",
      brand: "Samsung",
      model: "UE55AU7100UXRU",
      rating: 5,
      reviews: 124,
      isCredit: true,
      inStock: true,
      images: [
        "/samsung-smart-tv-living-room.png",
        "/samsung-tv-side-view.png",
        "/samsung-tv-remote.png",
        "/samsung-tv-back-view.png",
      ],
      description:
        "Samsung 55 dyuymli 4K Ultra HD Smart TV - zamonaviy texnologiyalar va ajoyib tasvir sifati bilan. Crystal UHD protsessori va Tizen operatsion tizimi bilan jihozlangan.",
      specifications: {
        "Ekran o'lchami": '55" (139 sm)',
        Ruxsat: "4K Ultra HD (3840x2160)",
        "Smart TV": "Ha, Tizen OS",
        HDR: "HDR10+",
        "Tovush quvvati": "20W (2x10W)",
        Ulanishlar: "3x HDMI, 2x USB, Wi-Fi, Bluetooth",
        "O'lchamlari": "123.1 x 70.6 x 5.9 sm",
        Vazni: "15.5 kg",
        "Energiya sarfi": "125W",
        Kafolat: "2 yil",
      },
      features: [
        "Crystal UHD 4K protsessor",
        "Smart TV Tizen OS",
        "HDR10+ qo'llab-quvvatlash",
        "Voice Remote boshqaruv pulti",
        "Wi-Fi va Bluetooth ulanish",
        "Gaming Mode",
      ],
    },
    2: {
      id: 2,
      name: "LG Kir yuvish mashinasi 8kg",
      price: 4200000,
      category: "kir-yuvish",
      brand: "LG",
      model: "F2V5HS8S",
      rating: 4,
      reviews: 89,
      isCredit: true,
      inStock: true,
      images: ["/lg-washing-machine-front.png", "/lg-washing-machine-side.png", "/lg-washing-machine-open.png"],
      description:
        "LG 8kg sig'imli avtomatik kir yuvish mashinasi - A+++ energiya samaradorligi va 14 xil yuvish dasturi bilan.",
      specifications: {
        "Sig'imi": "8 kg",
        "Aylanish tezligi": "1200 ayl/daq",
        "Energiya sinfi": "A+++",
        "Yuvish dasturlari": "14 ta",
        Displey: "LED displey",
        "Shovqin darajasi": "54 dB",
        "O'lchamlari": "60 x 56 x 85 sm",
        Vazni: "65 kg",
        "Suv sarfi": "56 litr",
        Kafolat: "2 yil",
      },
      features: [
        "Direct Drive motor",
        "6 Motion texnologiyasi",
        "Smart Diagnosis",
        "Allergiya qarshi dastur",
        "Tez yuvish rejimi",
        "Bolalardan himoya",
      ],
    },
  }

  useEffect(() => {
    const foundProduct = mockProducts[id]
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id])

  const calculateMonthlyPayment = (price, months) => {
    // Simple calculation without interest for demo
    return Math.round(price / months)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Here you would typically save to localStorage or send to API
  }

  const creditOptions = [
    { months: 3, label: "3 oy" },
    { months: 6, label: "6 oy" },
    { months: 9, label: "9 oy" },
    { months: 12, label: "12 oy" },
    { months: 18, label: "18 oy" },
    { months: 24, label: "24 oy" },
  ]

  if (!product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="loading">Mahsulot yuklanmoqda...</div>
        </div>
      </div>
    )
  }

  const currentPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div className="product-details">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Bosh sahifa
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">
            Mahsulotlar
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link to="/products" className="back-button">
          <ArrowLeft size={20} />
          Orqaga qaytish
        </Link>

        <div className="product-layout">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage] || "/placeholder.svg"} alt={product.name} />
              {product.discount && <div className="discount-badge">-{product.discount}%</div>}
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === selectedImage ? "active" : ""}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
                <Heart size={24} fill={isFavorite ? "#e74c3c" : "none"} />
              </button>
            </div>

            <div className="product-meta">
              <div className="brand-model">
                <span className="brand">{product.brand}</span>
                <span className="model">Model: {product.model}</span>
              </div>
              <div className="rating-reviews">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < product.rating ? "#ffc107" : "none"}
                      color={i < product.rating ? "#ffc107" : "#ddd"}
                    />
                  ))}
                </div>
                <span className="reviews">({product.reviews} sharh)</span>
              </div>
            </div>

            <div className="product-pricing">
              {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
              <span className="current-price">{formatPrice(currentPrice)}</span>
              {product.discount && (
                <span className="savings">{formatPrice(product.oldPrice - currentPrice)} tejash</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Asosiy xususiyatlar:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Miqdori:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn">
                  <ShoppingCart size={20} />
                  Savatga qo'shish
                </button>
                {product.isCredit && (
                  <button className="credit-btn" onClick={() => setShowCreditCalculator(!showCreditCalculator)}>
                    Kreditga olish
                  </button>
                )}
              </div>
            </div>

            {/* Credit Calculator */}
            {product.isCredit && showCreditCalculator && (
              <div className="credit-calculator">
                <h3>Kredit kalkulyatori</h3>
                <div className="credit-options">
                  {creditOptions.map((option) => (
                    <button
                      key={option.months}
                      className={`credit-option ${creditMonths === option.months ? "active" : ""}`}
                      onClick={() => setCreditMonths(option.months)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="credit-result">
                  <div className="monthly-payment">
                    <span className="label">Oylik to'lov:</span>
                    <span className="amount">{formatPrice(calculateMonthlyPayment(currentPrice, creditMonths))}</span>
                  </div>
                  <div className="credit-info">
                    <p>• Dastlabki to'lov: 0%</p>
                    <p>• Foiz stavkasi: 0%</p>
                    <p>• Umumiy to'lov: {formatPrice(currentPrice)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="delivery-info">
              <div className="delivery-item">
                <Truck size={20} />
                <span>Bepul yetkazib berish (1 mln so'mdan yuqori)</span>
              </div>
              <div className="delivery-item">
                <Shield size={20} />
                <span>2 yillik kafolat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="product-specifications">
          <h2>Texnik xususiyatlar</h2>
          <div className="specs-table">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="spec-row">
                <span className="spec-label">{key}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
