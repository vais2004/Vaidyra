import React from "react";
import { footerStyles as s } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import {
  Stethoscope,
  Activity,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: FaFacebookF,
      color: s.facebookColor,
      name: "Facebook",
      href: "https://www.facebook.com/",
    },
    {
      Icon: FaTwitter,
      color: s.twitterColor,
      name: "Twitter",
      href: "https://x.com/Vaish30052004",
    },
    {
      Icon: FaInstagram,
      color: s.instagramColor,
      name: "Instagram",
      href: "https://www.instagram.com/vaishhhhh.kawale?utm_source=qr&igsi=OXhobWc4c3hmeXp1",
    },
    {
      Icon: FaLinkedinIn,
      color: s.linkedinColor,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/vaishnavi-kawale-2753a034a",
    },
    {
      Icon: FaYoutube,
      color: s.youtubeColor,
      name: "YouTube",
      href: "https://youtube.com/@41-xll-a-vaishnavikawale99?si=dNDKLtF1MzU3tjFg",
    },
  ];

  return (
    <footer className={s.footerContainer}>
      <div className={s.floatingIcon1}>
        <Stethoscope className={s.stethoscopeIcon} />
      </div>
      <div className={s.floatingIcon2} style={{ animationDelay: "3s" }}>
        <Activity className={s.activityIcon} />
      </div>
      <div className={s.mainContent}>
        <div className={s.gridContainer}>
          <div className={s.companySection}>
            <div className={s.logoContainer}>
              <div className={s.logoWrapper}>
                <div className={s.logoImageContainer}>
                  <img className={s.logoImage} src={logo} alt="logo" />
                </div>
              </div>
              <div>
                <h2 className={s.companyName}>Vaidyra</h2>
                <p className={s.companyTagline}>Healthcare Solutions</p>
              </div>
            </div>
            <p className={s.companyDescription}>
              Your trusted partner in healthcare innovation. We're committed to
              providing exceptional medical care with cutting-edge technology
              and compassionate service.
            </p>
            <div className={s.contactContainer}>
              <div className={s.contactItem}>
                <div className={s.contactIconWrapper}>
                  <Phone className={s.contactIcon} />
                </div>
                <span className={s.contactText}>+91 8767843011</span>
              </div>
              <div className={s.contactItem}>
                <div className={s.contactIconWrapper}>
                  <Mail className={s.contactIcon} />
                </div>
                <span className={s.contactText}>vkawale2004@gmail.com</span>
              </div>
              <div className={s.contactItem}>
                <div className={s.contactIconWrapper}>
                  <MapPin className={s.contactIcon} />
                </div>
                <span className={s.contactText}>
                  Chhatrapati Sambhajinagar, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
          {/* quick list*/}
          <div className={s.linksSection}>
            <h3 className={s.sectionTitle}>Quick Links</h3>
            <ul className={s.linksList}>
              {quickLinks.map((link, index) => (
                <li key={link.name} className={s.linkItem}>
                  <a
                    href={link.href}
                    className={s.quickLink}
                    style={{ animationDelay: `${index * 60}ms` }}>
                    <div className={s.quickLinkIconWrapper}>
                      <ArrowRight className={s.quickLinkIcon} />
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.linksSection}>
            <h3 className={s.sectionTitle}>Our Services</h3>
            <ul className={s.linksList}>
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className={s.serviceLink}>
                    <div className={s.serviceIcon}></div>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter & Social */}
          <div className={s.newsletterSection}>
            <h3 className={s.newsletterTitle}>Stay Connected</h3>
            <p className={s.newsletterDescription}>
              Subscribe for health tips, medical updates, and wellness insights
              delivered to your inbox.
            </p>

            {/* Newsletter form */}
            <div className={s.newsletterForm}>
              <div className={s.mobileNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={s.emailInput}
                />
                <button className={s.mobileSubscribeButton}>
                  <Send className={s.mobileButtonIcon} />
                  Subscribe
                </button>
              </div>

              {/* Desktop newsletter */}
              <div className={s.desktopNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={s.desktopEmailInput}
                />
                <button className={s.desktopSubscribeButton}>
                  <Send className={s.desktopButtonIcon} />
                  <span className={s.desktopButtonText}>
                    Subscribe
                  </span>
                </button>
              </div>

              {/* Social icons */}
              <div className={s.socialContainer}>
                {socialLinks.map(({ Icon, color, name, href }, index) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.socialLink}
                    style={{ animationDelay: `${index * 120}ms` }}>
                    <div className={s.socialIconBackground} />
                    <Icon className={`${s.socialIcon} ${color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          ;
        </div>
      </div>
    </footer>
  );
};

export default Footer;
