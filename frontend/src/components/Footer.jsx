import React from "react";
import { footerStyles as s } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
      Icon: Facebook,
      color: footerStyles.facebookColor,
      name: "Facebook",
      href: "https://www.facebook.com/people/Hexagon-Digital-Services/61567156598660/",
    },
    {
      Icon: Twitter,
      color: footerStyles.twitterColor,
      name: "Twitter",
      href: "https://www.linkedin.com/company/hexagondigtial-services/",
    },
    {
      Icon: Instagram,
      color: footerStyles.instagramColor,
      name: "Instagram",
      href: "http://instagram.com/hexagondigitalservices?igsh=MWp2NG1oNTlibWVnZA%3D%3D",
    },
    {
      Icon: Linkedin,
      color: footerStyles.linkedinColor,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/hexagondigtial-services/",
    },
    {
      Icon: Youtube,
      color: footerStyles.youtubeColor,
      name: "YouTube",
      href: "https://youtube.com/@hexagondigitalservices?si=lxEFYNCP42t6AoDJ",
    },
  ];

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Footer;
