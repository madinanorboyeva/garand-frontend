"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, AtSign } from "lucide-react";
import axios from "axios";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const API_URL = "http://192.168.100.22:8000/api/orders/contact/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(API_URL, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        is_read: false,
      });

      if (response.status === 201) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Reset status after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting contact message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Telefon raqamlar",
      details: ["+998 (71) 123-45-67", "+998 (90) 123-45-67"],
      description: "24/7 qo'llab-quvvatlash xizmati",
    },
    {
      icon: <Mail size={24} />,
      title: "Email manzillar",
      details: ["info@garandsavdo.uz", "support@garandsavdo.uz"],
      description: "24 soat ichida javob beramiz",
    },
    {
      icon: <MapPin size={24} />,
      title: "Bizning manzilimiz",
      details: ["Toshkent sh., Chilonzor tumani", "Bunyodkor ko'chasi 12-uy"],
      description: "Metro: Chilonzor (5 daqiqa piyoda)",
    },
    {
      icon: <Clock size={24} />,
      title: "Ish vaqti",
      details: ["Dush-Shan: 9:00 - 20:00", "Yakshanba: 10:00 - 18:00"],
      description: "Dam olish kunlari ham ochiq",
    },
  ];

  const faqItems = [
    {
      question: "Yetkazib berish qancha vaqt oladi?",
      answer: "Toshkent bo'ylab 1-2 kun, viloyatlarga 3-5 kun ichida yetkazib beramiz.",
    },
    {
      question: "Kredit olish uchun qanday hujjatlar kerak?",
      answer: "Faqat pasport va yashash joyi ma'lumotnomasi yetarli.",
    },
    {
      question: "Kafolat muddati qancha?",
      answer: "Barcha mahsulotlarga 2 yillik rasmiy kafolat beramiz.",
    },
    {
      question: "To'lovni qanday amalga oshirish mumkin?",
      answer: "Naqd, plastik karta, bank o'tkazmasi va kredit orqali to'lash mumkin.",
    },
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Biz bilan bog'laning</h1>
          <p>Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!</p>
        </div>

        {/* Contact Info Cards */}
        <div className="contact-info-section">
          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="detail-item">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="contact-description">{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="contact-main">
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Fikr-mulohaza yuboring</h2>
              <p>Sizning xabaringiz biz uchun muhim. Tez orada javob beramiz!</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <User size={18} />
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="To'liq ismingizni kiriting"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <AtSign size={18} />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={18} />
                    Telefon raqami
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+998 (90) 123-45-67"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">
                    <MessageCircle size={18} />
                    Mavzu *
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required>
                    <option value="">Mavzuni tanlang</option>
                    <option value="product">Mahsulot haqida savol</option>
                    <option value="order">Buyurtma holati</option>
                    <option value="credit">Kredit haqida</option>
                    <option value="delivery">Yetkazib berish</option>
                    <option value="warranty">Kafolat xizmati</option>
                    <option value="complaint">Shikoyat</option>
                    <option value="suggestion">Taklif</option>
                    <option value="other">Boshqa</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <MessageCircle size={18} />
                  Xabaringiz *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Xabaringizni batafsil yozing..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Xabar yuborish
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="success-message">
                  <p>✅ Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.</p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="error-message">
                  <p>❌ Xabar yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.</p>
                </div>
              )}
            </form>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2>Tez-tez so'raladigan savollar</h2>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <h3 className="faq-question">{item.question}</h3>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="additional-help">
              <h3>Boshqa savollaringiz bormi?</h3>
              <p>Bizning mutaxassislarimiz sizga yordam berishga tayyor!</p>
              <div className="help-buttons">
                <a href="tel:+998711234567" className="help-btn">
                  <Phone size={18} />
                  Qo'ng'iroq qiling
                </a>
                <a href="mailto:info@garandsavdo.uz" className="help-btn">
                  <Mail size={18} />
                  Email yuboring
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2>Bizni topish oson</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Garand Savdo Markazi joylashuvi"
            ></iframe>
            <div className="map-overlay">
              <div className="map-info">
                <h3>Garand Savdo Markazi</h3>
                <p>Toshkent sh., Chilonzor tumani</p>
                <p>Bunyodkor ko'chasi 12-uy</p>
                <a
                  href="https://maps.google.com/?q=41.2995,69.2401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  Yo'nalishni olish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;




// salom dunyo 