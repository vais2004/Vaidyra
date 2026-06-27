import React, { useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { User, Key, Menu, X } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
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
              <div className={navbarStyles.desktopNav}>
                <div className={navbarStyles.navItemsContainer}>
                  {navItems.map((item) => {
                    const isActive = location.pathname == item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`${navbarStyles.navItem} ${isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive}`}>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className={navbarStyles.rightContainer}>
                <SignedOut>
                  <Link
                    to="/doctor-admin/login"
                    className={navbarStyles.doctorAdminButton}>
                    <User className={navbarStyles.doctorAdminIcon} />
                    <span className={navbarStyles.doctorAdminText}>
                      Doctor Admin
                    </span>
                  </Link>
                  <button
                    onClick={() => clerk.openSignIn()}
                    className={navbarStyles.loginButton}>
                    <Key className={navbarStyles.loginIcon} />
                    Login
                  </button>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={navbarStyles.mobileToggle}>
                  {isOpen ? (
                    <X className={navbarStyles.toggleIcon} />
                  ) : (
                    <Menu className={navbarStyles.toggleIcon} />
                  )}
                </button>
              </div>
            </div>
            {/* mobile nav */}
            {isOpen && (
              <div className={navbarStyles.mobileMenu}>
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`${navbarStyles.mobileMenuItem} ${isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemInactive}`}>
                      {item.label}
                    </Link>
                  );
                })}
                <SignedOut>
                  <Link
                    to="/doctor-admin/login"
                    className={navbarStyles.mobileDoctorAdminButton}
                    onClick={() => setIsOpen(false)}>
                    Doctor Admin
                  </Link>
                  <div className={navbarStyles.mobileLoginContainer}>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        clerk.openSignIn();
                      }}
                      className={navbarStyles.mobileLoginButton}>
                      Login
                    </button>
                  </div>
                </SignedOut>
              </div>
            )}
          </div>
          <style>{navbarStyles.animationStyles}</style>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
