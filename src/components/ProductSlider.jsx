"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./ProductCard"
import "../styles/product-slider.css"

const ProductSlider = ({ products, title, showDiscount = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= products.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, products.length - itemsPerView) : prev - 1))
  }

  return (
    <div className="product-slider">
      <div className="slider-header">
        <h2 className="slider-title">{title}</h2>
        <div className="slider-controls">
          <button className="control-btn" onClick={prevSlide}>
            <ChevronLeft size={20} />
          </button>
          <button className="control-btn" onClick={nextSlide}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="slider-item">
              <ProductCard product={product} showDiscount={showDiscount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
