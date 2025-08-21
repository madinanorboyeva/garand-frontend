"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../styles/hero-slider.css"

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Eng yangi Samsung televizorlari",
      subtitle: "50% gacha chegirma",
      description: "4K Ultra HD, Smart TV funksiyalari bilan",
      image: "/modern-samsung-tv-display.png",
      buttonText: "Ko'rish",
      buttonLink: "/products?category=tv",
    },
    {
      id: 2,
      title: "Kir yuvish mashinalari",
      subtitle: "Kredit 0% foiz bilan",
      description: "LG, Samsung, Bosch brendlari",
      image: "/modern-washing-machine.png",
      buttonText: "Kredit olish",
      buttonLink: "/credit",
    },
    {
      id: 3,
      title: "Xolodilniklar aksiyasi",
      subtitle: "Eng sifatli brendlar",
      description: "2 yillik kafolat bilan",
      image: "/modern-refrigerator.png",
      buttonText: "Mahsulotlar",
      buttonLink: "/products?category=refrigerator",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`slide ${index === currentSlide ? "active" : ""}`}>
            <div className="slide-content">
              <div className="slide-text">
                <h1 className="slide-title">{slide.title}</h1>
                <h2 className="slide-subtitle">{slide.subtitle}</h2>
                <p className="slide-description">{slide.description}</p>
                <a href={slide.buttonLink} className="slide-button">
                  {slide.buttonText}
                </a>
              </div>
              <div className="slide-image">
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
              </div>
            </div>
          </div>
        ))}

        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="slider-btn next-btn" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
