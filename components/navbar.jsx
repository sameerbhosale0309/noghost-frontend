import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { motion } from "motion/react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";

  const onLogout = () => {
    logout();
    nav("/login");
  };

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  const handleScroll = (selector) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Shared Brand Logo carrying the circle emblem + wordmark "NoGhost"
  const renderBrandLogo = (onClickAction) => (
    <motion.div 
      style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClickAction}
    >
      <div style={{
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
      }}>
        <span style={{
          color: "#ffffff",
          fontFamily: "'Outfit', sans-serif",
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "-0.03em"
        }}>
          NG
        </span>
      </div>
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "1.2rem",
        fontWeight: 900,
        letterSpacing: "-0.02em",
        color: "#1a1a2e"
      }}>NoGhost</span>
    </motion.div>
  );

  return (
    <div style={{
      position: "sticky",
      top: 0,
      width: "100%",
      background: "rgba(255, 255, 255, 0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(26,26,26,0.05)",
      zIndex: 100
    }}>
      <div className="nav-inner" style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {renderBrandLogo(() => nav("/"))}

          <NavLink to="/" className={linkClass}>
            home
          </NavLink>

          {user?.role === "client" ? (
            <NavLink to="/client" className={linkClass}>
              dashboard
            </NavLink>
          ) : null}

          {user?.role === "freelancer" ? (
            <NavLink to="/freelancer" className={linkClass}>
              dashboard
            </NavLink>
          ) : null}
        </div>

        <div className="nav-right" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {user ? (
            <>
              <span className="muted" style={{ fontWeight: 600, fontSize: '13px', color: "#5b5b75" }}>
                {user.email} <span style={{ opacity: 0.5 }}>({user.role})</span>
              </span>
              <motion.button 
                className="btn" 
                onClick={onLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  padding: '8px 16px', 
                  borderRadius: '99px', 
                  background: "#1a1a2e", 
                  color: "white", 
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                logout
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}