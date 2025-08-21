import { useEffect, useState } from "react"
import HeroSlider from "../components/HeroSlider"
import ProductSlider from "../components/ProductSlider"
import ProductCard from "../components/ProductCard"
import { CreditCard, Truck, Shield, Headphones } from "lucide-react"
import "../styles/home.css"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
useEffect(() => {
  fetch("http://192.168.100.22:8000/api/products/products/") // ✅ mahsulotlar API
    .then((res) => res.json())
    .then((data) => {
      console.log("API mahsulotlar:", data)
      setProducts(data) // bu yerda allaqachon massiv bo‘lishi kerak
      setLoading(false)
    })
    .catch((err) => {
      console.error("API xatolik:", err)
      setLoading(false)
    })
}, [])

  // useEffect(() => {
  //   fetch("http://192.168.100.22:8000/api/products/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data)
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.error("API xatolik:", err)
  //       setLoading(false)
  //     })
  // }, [])

  if (loading) {
    return <p className="loading">Yuklanmoqda...</p>
  }

  // API dan keladigan mahsulotlarni ajratamiz
  const bestSellingProducts = products.filter((p) => p.is_bestseller)
  const saleProducts = products.filter((p) => p.is_on_sale)



  return (
    <div className="home">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <div className="feature-content">
                <h3>Bepul yetkazib berish</h3>
                <p>1 mln so'mdan yuqori xaridlarga</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <CreditCard size={32} />
              </div>
              <div className="feature-content">
                <h3>Kredit 0% foiz</h3>
                <p>12 oygacha to'lov muddati</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <div className="feature-content">
                <h3>2 yillik kafolat</h3>
                <p>Barcha mahsulotlarga</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Headphones size={32} />
              </div>
              <div className="feature-content">
                <h3>24/7 qo'llab-quvvatlash</h3>
                <p>Har doim sizning xizmatingizda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="best-selling-section">
        <div className="container">
          <h2 className="section-title">Eng ko'p sotilgan mahsulotlar</h2>
          <div className="products-grid">
            {bestSellingProducts.length > 0 ? (
              bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>Hozircha eng ko‘p sotilgan mahsulotlar yo‘q</p>
            )}
          </div>
        </div>
      </section>

      {/* Sale Products Slider */}
      <section className="sale-section">
        <div className="container">
          <ProductSlider
            products={saleProducts}
            title="Chegirmadagi mahsulotlar"
            showDiscount={true}
          />
        </div>
      </section>

      {/* Credit Banner */}
      <section className="credit-banner">
        <div className="container">
          <div className="credit-content">
            <div className="credit-text">
              <h2>Kredit olish juda oson!</h2>
              <p>Faqat pasport bilan, 0% foiz, 12 oygacha to'lov muddati</p>
              <ul className="credit-benefits">
                <li>Dastlabki to'lovsiz</li>
                <li>Tez rasmiylashtirish</li>
                <li>Qulay oylik to'lovlar</li>
              </ul>
              <a href="/credit" className="credit-btn">
                Kredit haqida batafsil
              </a>
            </div>
            <div className="credit-image">
              <img src="/credit-card-calculator.png" alt="Kredit" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
