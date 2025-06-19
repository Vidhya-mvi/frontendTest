import "../index.css";
import logo from "../assets/Logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-cards">
        
          <div className="contact-card">
            <h3>CONNECT WITH US</h3>
            <p className="contact-line">
              <Phone size={18} style={{ marginRight: "8px" }} />
              +91 9561876330
            </p>
            <p className="contact-line">
              <Mail size={18} style={{ marginRight: "8px" }} />
              info@deepnetsoft.com
            </p>
          </div>

   
          <div className="contact-card center-card">
            <img src={logo} alt="Logo" className="contact-logo" />
            <h3 className="logo-center">
              <span className="logo-blue">DEEP</span>{" "}
              <span className="logo-gray">NET</span>{" "}
              <span className="logo-light">SOFT</span>
            </h3>
            <div className="social-icons">
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="contact-card">
            <h3>FIND US</h3>
            <p className="contact-line">
              <MapPin size={18} style={{ marginRight: "8px" }} />
              <span>
                First floor, Geo Infopark, <br />
                Infopark EXP, Kakkanad
              </span>           
               </p>
          </div>
        </div>
      </div>

      
    </section>
  );
}
