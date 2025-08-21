"use client"

import { MapPin, Phone, Mail, Clock, Users, Award, Truck, Shield } from "lucide-react"
import "../styles/about.css"

const About = () => {
  const milestones = [
    {
      year: "2010",
      title: "Kompaniya tashkil etildi",
      description: "Garand Savdo Markazi kichik do'kon sifatida o'z faoliyatini boshladi",
    },
    {
      year: "2015",
      title: "Birinchi filial ochildi",
      description: "Toshkent shahrida ikkinchi do'konimizni ochdik",
    },
    {
      year: "2018",
      title: "Onlayn savdo boshlandi",
      description: "Zamonaviy veb-sayt va onlayn xaridlar tizimini ishga tushirdik",
    },
    {
      year: "2020",
      title: "Kredit xizmati joriy etildi",
      description: "Mijozlarimiz uchun 0% foizli kredit dasturini boshladik",
    },
    {
      year: "2024",
      title: "Yetakchi brend maqomi",
      description: "O'zbekistondagi eng yirik maishiy texnika do'konlaridan biriga aylandik",
    },
  ]

  const stats = [
    {
      icon: <Users size={32} />,
      number: "50,000+",
      label: "Mamnun mijozlar",
    },
    {
      icon: <Award size={32} />,
      number: "14",
      label: "Yillik tajriba",
    },
    {
      icon: <Truck size={32} />,
      number: "1000+",
      label: "Oylik yetkazib berish",
    },
    {
      icon: <Shield size={32} />,
      number: "2",
      label: "Yillik kafolat",
    },
  ]

  const team = [
    {
      name: "Akmal Karimov",
      position: "Bosh direktor",
      image: "/team-ceo.png",
      description: "14 yillik tajriba bilan kompaniyani boshqaradi",
    },
    {
      name: "Nilufar Rahimova",
      position: "Savdo bo'limi rahbari",
      image: "/team-sales-manager.png",
      description: "Mijozlar bilan ishlash bo'yicha mutaxassis",
    },
    {
      name: "Bobur Toshmatov",
      position: "Texnik xizmat rahbari",
      image: "/team-tech-manager.png",
      description: "Texnik yordam va ta'mirlash xizmatlari",
    },
  ]

  const values = [
    {
      icon: <Award size={24} />,
      title: "Sifat",
      description: "Faqat eng sifatli va ishonchli brendlarni tanlaymiz",
    },
    {
      icon: <Users size={24} />,
      title: "Mijozlar",
      description: "Har bir mijozimiz biz uchun muhim va qimmatli",
    },
    {
      icon: <Shield size={24} />,
      title: "Ishonch",
      description: "Uzun muddatli hamkorlik va ishonchli xizmat",
    },
    {
      icon: <Truck size={24} />,
      title: "Xizmat",
      description: "Tez va sifatli yetkazib berish hamda xizmat ko'rsatish",
    },
  ]

  return (
    <div className="about-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Biz haqimizda</h1>
          <p>Garand Savdo Markazi - O'zbekistondagi yetakchi maishiy texnika do'koni</p>
        </div>

        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h2>14 yildan beri sizning xizmatingizdamiz</h2>
              <p>
                2010-yilda kichik do'kon sifatida boshlangan yo'limiz bugun O'zbekistondagi eng yirik maishiy texnika
                do'konlaridan biriga aylandi. Bizning maqsadimiz - har bir oilaga eng sifatli va zamonaviy texnikalarni
                yetkazish.
              </p>
              <p>
                Biz nafaqat mahsulot sotamiz, balki mijozlarimizga to'liq xizmat ko'rsatamiz: maslahat berishdan tortib,
                yetkazib berish, o'rnatish va kafolat xizmatigacha.
              </p>
            </div>
            <div className="hero-image">
              <img src="/about-hero-store.png" alt="Garand Savdo Markazi" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section">
          <h2>Bizning tariximiz</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>Bizning qadriyatlarimiz</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Bizning jamoamiz</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Section */}
        <div className="location-section">
          <h2>Bizning joylashuvimiz</h2>
          <div className="location-content">
            <div className="location-info">
              <div className="contact-item">
                <MapPin size={20} />
                <div>
                  <h3>Manzil</h3>
                  <p>Toshkent sh., Chilonzor tumani, Bunyodkor ko'chasi 12-uy</p>
                </div>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <div>
                  <h3>Telefon</h3>
                  <p>+998 (71) 123-45-67</p>
                  <p>+998 (90) 123-45-67</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <div>
                  <h3>Email</h3>
                  <p>info@garandsavdo.uz</p>
                  <p>support@garandsavdo.uz</p>
                </div>
              </div>
              <div className="contact-item">
                <Clock size={20} />
                <div>
                  <h3>Ish vaqti</h3>
                  <p>Dushanba - Shanba: 9:00 - 20:00</p>
                  <p>Yakshanba: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzU4LjIiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Garand Savdo Markazi joylashuvi"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
