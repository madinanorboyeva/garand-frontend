import { Phone, Mail, MapPin, Clock, Facebook, Instagram, TextIcon as Telegram } from "lucide-react"
import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">Garand Savdo Markazi</h3>
            <p className="footer-description">
              Eng sifatli maishiy texnikalar va eng qulay narxlar. Bizning maqsadimiz - har bir oilaga zamonaviy
              texnikalar yetkazish.
            </p>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Aloqa ma'lumotlari</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>+998 (71) 123-45-67</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@garandsavdo.uz</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Toshkent sh., Chilonzor tumani</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Ish vaqti</h4>
            <div className="working-hours">
              <div className="time-item">
                <Clock size={16} />
                <div>
                  <p>Dushanba - Shanba: 9:00 - 20:00</p>
                  <p>Yakshanba: 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Ijtimoiy tarmoqlar</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Telegram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Garand Savdo Markazi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
