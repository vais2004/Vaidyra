import React, { useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import logo from "../assets/logo.png";

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDocterLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch (error) {
      return false;
    }
  });

  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <>
      <div className={navbarStyles.navbarBorder}>
        <nav
          className={`${navbarStyles.navbarContainer} ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}`}>
          <div className={navbarStyles.contentWrapper}>
            <div className={navbarStyles.flexContainer}>
              <Link to="/" className={navbarStyles.logoLink}>
                <div className={navbarStyles.logoContainer}>
                  <div className={navbarStyles.logoImageWrapper}>
                    <img
                      src={logo}
                      alt="logo"
                      className={navbarStyles.logoImage}
                    />
                  </div>
                </div>
                <div className={navbarStyles.logoTextContainer}>
                  <h1 className={navbarStyles.logoTitle}>Vaidyra</h1>
                  <p className={navbarStyles.logoSubtitle}>
                    Healthcare Solutions
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
