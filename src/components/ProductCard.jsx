"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
import "../styles/product-card.css"

const ProductCard = ({ product, showDiscount = false }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
    // Here you would typically save to localStorage or send to API
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const discountPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
          {product.discount && <div className="discount-badge">-{product.discount}%</div>}
          {product.isCredit && <div className="credit-badge">Kredit</div>}
          <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
            <Heart size={18} fill={isFavorite ? "#e74c3c" : "none"} />
          </button>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>

          {product.rating && (
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < product.rating ? "#ffc107" : "none"}
                  color={i < product.rating ? "#ffc107" : "#ddd"}
                />
              ))}
              <span className="rating-text">({product.reviews || 0})</span>
            </div>
          )}

          <div className="product-pricing">
            {product.discount ? (
              <>
                <span className="old-price">{formatPrice(product.price)}</span>
                <span className="new-price">{formatPrice(discountPrice)}</span>
              </>
            ) : (
              <span className="price">{formatPrice(product.price)}</span>
            )}
          </div>

          {product.isCredit && (
            <div className="credit-info">
              <span>dan {formatPrice(discountPrice / 12)}/oyiga</span>
            </div>
          )}
        </div>
      </Link>

      <button className="add-to-cart-btn">
        <ShoppingCart size={16} />
        Savatga qo'shish
      </button>
    </div>
  )
}

export default ProductCard
