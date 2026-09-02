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

import { Stethoscope, Activity, Phone, Mail, MapPin } from "lucide-react";

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
      href: "https://www.facebook.com/people/Hexagon-Digital-Services/61567156598660/",
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
    <div className={s.footerContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
