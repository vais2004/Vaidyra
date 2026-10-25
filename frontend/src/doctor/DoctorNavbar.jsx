import React, { useMemo, useState } from "react";
import { navbarStylesDr as s } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Calendar, Edit, Home, Icon, LogOut, Menu, X } from "lucide-react";

const DoctorNavbar = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const location = useLocation();

  //use params first else extract from the pathname
  const doctorId = useMemo(() => {
    if (params?.id) return params.id;
    const m = location.pathname.match(/\/doctor-admin\/([^/]+)/);
    if (m) return m[1];
    return null;
  }, [params, location.pathname]);

  const basePath = doctorId
    ? `/doctor-admin/${doctorId}`
    : "/doctor-admin/login";

  const navItems = [
    { name: "Dashboard", to: `${basePath}`, Icon: Home },
    { name: "Appointments", to: `${basePath}/appointments`, Icon: Calendar },
    { name: "Edit Profile", to: `${basePath}/profile/edit`, Icon: Edit },
  ];

  return (
    <>
      <nav className={s.navContainer}>
        <div className={s.leftBrand}>
          <div className={s.logoContainer}>
            <img src={logo} alt="logo" className={s.logoImage} />
          </div>
          <div className={s.brandTextContainer}>
            <div className={s.brandTitle}>MedTek</div>
            <div className={s.brandSubtitle}>Healthcare Solutions</div>
          </div>
        </div>
        {/**desktop */}
        <div className={s.desktopMenu}>
          <div className={s.desktopMenuItems}>
            {navItems.map(({ name, to, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === basePath}
                className={({ isActive }) =>
                  `${s.baseLink} ${isActive ? s.activeLink : s.inactiveLink}`
                }
                onClick={() => setOpen(false)}>
                <span className={s.linkContent}>
                  <Icon size={16} className={s.linkIcon} />
                  <span className={s.linkText}>{name}</span>
                </span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className={s.rightActions}>
          <button
            onClick={() => {
              localStorage.removeItem("doctorToken_v1");
              window.location.href = "/doctor-admin/login";
            }}
            className={s.logoutButtonDesktop}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>

          {/**to toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className={s.hamburgerButtonMd}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            onClick={() => setOpen((s) => !s)}
            className={s.hamburgerButtonLg}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div className={s.mobileMenuContainer(open)}>
        <div className={s.mobileMenuContent}>
          {navItems.map(({ name, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === basePath}
              className={({ isActive }) =>
                `${s.mobileBaseLink} ${isActive ? s.mobileActiveLink : s.mobileInactiveLink}`
              }
              onClick={() => setOpen(false)}>
              <Icon size={18} className="text-emerald-400" />
              <span>{name}</span>
            </NavLink>
          ))}
          <button
            className={s.mobileLogoutButton}
            onClick={() => {
              setOpen(false);
              window.location.href = "/doctor-admin/login";
            }}>
            <div className={s.mobileMenuContainer}>
              <LogOut size={16} />
              Logout
            </div>
          </button>
        </div>
      </div>
      <div className={s.spacer}></div>
    </>
  );
};

export default DoctorNavbar;
