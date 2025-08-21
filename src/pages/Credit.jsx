"use client"

import { useState } from "react"
import { CreditCard, FileText, CheckCircle, Calculator, Users, Clock } from "lucide-react"
import "../styles/credit.css"

const Credit = () => {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [loanTerm, setLoanTerm] = useState(12)

  const calculateMonthlyPayment = (amount, months) => {
    return Math.round(amount / months)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
  }

  const creditTerms = [
    {
      icon: <CreditCard size={24} />,
      title: "0% foiz stavka",
      description: "Barcha mahsulotlarga 0% foiz bilan kredit",
    },
    {
      icon: <Clock size={24} />,
      title: "3-24 oy muddat",
      description: "O'zingizga qulay muddatni tanlang",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Dastlabki to'lovsiz",
      description: "Hech qanday dastlabki to'lov talab qilinmaydi",
    },
    {
      icon: <Users size={24} />,
      title: "Oson rasmiylashtirish",
      description: "Faqat pasport bilan 15 daqiqada",
    },
  ]

  const requiredDocuments = [
    {
      title: "Pasport",
      description: "O'zbekiston Respublikasi fuqarosining pasporti",
      required: true,
    },
    {
      title: "Yashash joyi ma'lumotnomasi",
      description: "Doimiy yashash joyi haqida ma'lumotnoma",
      required: true,
    },
    {
      title: "Daromad ma'lumotlari",
      description: "Ish joyidan ma'lumotnoma yoki pensiya guvohnomasi",
      required: false,
    },
    {
      title: "Telefon raqami",
      description: "Faol mobil telefon raqami",
      required: true,
    },
  ]

  const creditExamples = [
    {
      product: 'Samsung 55" Smart TV',
      price: 8500000,
      term3: Math.round(8500000 / 3),
      term6: Math.round(8500000 / 6),
      term12: Math.round(8500000 / 12),
      term18: Math.round(8500000 / 18),
      term24: Math.round(8500000 / 24),
    },
    {
      product: "LG Xolodilnik 350L",
      price: 6800000,
      term3: Math.round(6800000 / 3),
      term6: Math.round(6800000 / 6),
      term12: Math.round(6800000 / 12),
      term18: Math.round(6800000 / 18),
      term24: Math.round(6800000 / 24),
    },
    {
      product: "Bosch Kir yuvish mashinasi",
      price: 5500000,
      term3: Math.round(5500000 / 3),
      term6: Math.round(5500000 / 6),
      term12: Math.round(5500000 / 12),
      term18: Math.round(5500000 / 18),
      term24: Math.round(5500000 / 24),
    },
    {
      product: "Midea Konditsioner",
      price: 3500000,
      term3: Math.round(3500000 / 3),
      term6: Math.round(3500000 / 6),
      term12: Math.round(3500000 / 12),
      term18: Math.round(3500000 / 18),
      term24: Math.round(3500000 / 24),
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Mahsulotni tanlang",
      description: "Kerakli mahsulotni tanlang va 'Kreditga olish' tugmasini bosing",
    },
    {
      number: "02",
      title: "Ariza to'ldiring",
      description: "Oddiy onlayn ariza formani to'ldiring",
    },
    {
      number: "03",
      title: "Hujjatlarni taqdim eting",
      description: "Kerakli hujjatlarni olib keling yoki yuklang",
    },
    {
      number: "04",
      title: "Tasdiqlash",
      description: "15 daqiqada kredit tasdiqlanadi",
    },
    {
      number: "05",
      title: "Mahsulotni oling",
      description: "Mahsulotni do'kondan oling yoki yetkazib berishni buyurtma qiling",
    },
  ]

  return (
    <div className="credit-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Kredit xizmati</h1>
          <p>0% foiz bilan qulay to'lov - hech qanday yashirin to'lovlarsiz!</p>
        </div>

        {/* Credit Hero */}
        <div className="credit-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Orzuingizdagi texnikani bugun oling!</h2>
              <p>Faqat pasport bilan, 0% foiz, 24 oygacha to'lov muddati</p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">0%</span>
                  <span className="stat-label">Foiz stavka</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15</span>
                  <span className="stat-label">Daqiqada tasdiqlash</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24</span>
                  <span className="stat-label">Oygacha muddat</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src="/credit-approval-process.png" alt="Kredit jarayoni" />
            </div>
          </div>
        </div>

        {/* Credit Terms */}
        <div className="credit-terms">
          <h2>Kredit shartlari</h2>
          <div className="terms-grid">
            {creditTerms.map((term, index) => (
              <div key={index} className="term-card">
                <div className="term-icon">{term.icon}</div>
                <h3>{term.title}</h3>
                <p>{term.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Calculator */}
        <div className="credit-calculator-section">
          <h2>Kredit kalkulyatori</h2>
          <div className="calculator-container">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Kredit miqdori</label>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="amount-slider"
                />
                <div className="amount-display">{formatPrice(loanAmount)}</div>
              </div>

              <div className="input-group">
                <label>To'lov muddati</label>
                <div className="term-buttons">
                  {[3, 6, 9, 12, 18, 24].map((months) => (
                    <button
                      key={months}
                      className={`term-btn ${loanTerm === months ? "active" : ""}`}
                      onClick={() => setLoanTerm(months)}
                    >
                      {months} oy
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="calculator-result">
              <div className="result-card">
                <Calculator size={32} />
                <h3>Oylik to'lov</h3>
                <div className="monthly-payment">{formatPrice(calculateMonthlyPayment(loanAmount, loanTerm))}</div>
                <div className="payment-details">
                  <div className="detail">
                    <span>Umumiy to'lov:</span>
                    <span>{formatPrice(loanAmount)}</span>
                  </div>
                  <div className="detail">
                    <span>Foiz stavka:</span>
                    <span>0%</span>
                  </div>
                  <div className="detail">
                    <span>Dastlabki to'lov:</span>
                    <span>0 so'm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="documents-section">
          <h2>Kerakli hujjatlar</h2>
          <div className="documents-grid">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className={`document-card ${doc.required ? "required" : "optional"}`}>
                <div className="document-header">
                  <FileText size={24} />
                  <div className="document-status">
                    {doc.required ? (
                      <span className="required-badge">Majburiy</span>
                    ) : (
                      <span className="optional-badge">Ixtiyoriy</span>
                    )}
                  </div>
                </div>
                <h3>{doc.title}</h3>
                <p>{doc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Examples Table */}
        <div className="examples-section">
          <h2>Kredit misollari</h2>
          <div className="examples-table-container">
            <table className="examples-table">
              <thead>
                <tr>
                  <th>Mahsulot</th>
                  <th>Narxi</th>
                  <th>3 oy</th>
                  <th>6 oy</th>
                  <th>12 oy</th>
                  <th>18 oy</th>
                  <th>24 oy</th>
                </tr>
              </thead>
              <tbody>
                {creditExamples.map((example, index) => (
                  <tr key={index}>
                    <td className="product-name">{example.product}</td>
                    <td className="price">{formatPrice(example.price)}</td>
                    <td>{formatPrice(example.term3)}</td>
                    <td>{formatPrice(example.term6)}</td>
                    <td>{formatPrice(example.term12)}</td>
                    <td>{formatPrice(example.term18)}</td>
                    <td>{formatPrice(example.term24)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it Works */}
        <div className="steps-section">
          <h2>Kredit olish jarayoni</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Bugun kredit oling!</h2>
            <p>Mahsulotlarni ko'ring va o'zingizga mos kreditni tanlang</p>
            <div className="cta-buttons">
              <a href="/products" className="cta-btn primary">
                Mahsulotlarni ko'rish
              </a>
              <a href="/contact" className="cta-btn secondary">
                Savollaringiz bormi?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credit
