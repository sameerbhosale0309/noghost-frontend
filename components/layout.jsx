import Navbar from "./navbar";
import { motion } from "motion/react";

export default function Layout({ children, fullWidth = false, authPage = false }) {
  if (fullWidth) {
    return (
      <div>
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (authPage) {
    // Auth Pages: Center the neomorphic mockup container perfectly on the screen without scrolling
    return (
      <div style={{ 
        backgroundColor: "#D6EFE0", 
        height: "100vh", 
        width: "100%", 
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box"
      }}>
        <Navbar />
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 12px",
          boxSizing: "border-box",
          overflow: "hidden",
          width: "100%"
        }}>
          <motion.div 
            className="container"
            style={{
              margin: 0,
              width: "100%",
              maxWidth: "480px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              maxHeight: "100%",
              overflowY: "auto"
            }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    );
  }

  // Dashboard pages: Navbar at top (outside container), content wrapped in container mockup
  return (
    <div style={{ 
      backgroundColor: "#D6EFE0", 
      minHeight: "100vh", 
      width: "100%", 
      paddingBottom: "40px",
      boxSizing: "border-box" 
    }}>
      <Navbar />
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
