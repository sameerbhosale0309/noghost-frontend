import { Link } from "react-router-dom";
import { motion } from "motion/react";

const getPastelClass = (status) => {
  if (status === "completed") return "bg-pastel-green";
  if (status === "flagged") return "bg-pastel-pink";
  if (status === "in_progress") return "bg-pastel-blue";
  return "bg-pastel-yellow";
};

const getStatusEmoji = (status) => {
  if (status === "completed") return "✓";
  if (status === "flagged") return "⚠";
  if (status === "in_progress") return "⚡";
  return "⚙";
};

export default function ProjectCard({ project, rightAction }) {
  return (
    <motion.div 
      className={`card ${getPastelClass(project.status)}`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layoutId={project._id}
      style={{
        borderRadius: "24px",
        padding: "24px",
        border: "1px solid rgba(0, 0, 0, 0.04)",
        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.02)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "180px",
        boxSizing: "border-box"
      }}
    >
      {/* Top Header Row */}
      <div className="row" style={{ alignItems: "center", marginBottom: "14px", display: "flex", justifyContent: "space-between", width: "100%" }}>
        {/* Status circle badge */}
        <div style={{ 
          width: "32px", 
          height: "32px", 
          borderRadius: "50%", 
          background: "rgba(255, 255, 255, 0.55)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 800,
          color: "#1a1a2e"
        }}>
          {getStatusEmoji(project.status)}
        </div>

        {/* Budget in a clean white pill */}
        <div style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "4px 12px",
          borderRadius: "99px",
          fontSize: "11px",
          fontWeight: 800,
          color: "#1a1a2e",
          boxShadow: "0 2px 6px rgba(0,0,0,0.02)"
        }}>
          ${project.budget} USD
        </div>
      </div>

      {/* Title & Description */}
      <div style={{ flexGrow: 1, textAlign: "left" }}>
        <h4 className="card-title" style={{ fontSize: "1.2rem", fontWeight: 800, margin: "0 0 8px 0", lineHeight: "1.3" }}>
          <Link to={`/projects/${project._id}`} style={{ color: "#1a1a2e" }}>
            {project.title}
          </Link>
        </h4>
        
        {project.description ? (
          <p className="muted" style={{ fontSize: "12px", color: "rgba(26, 26, 46, 0.6)", lineHeight: "1.4", margin: "0 0 16px 0", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {project.description}
          </p>
        ) : (
          <div style={{ height: "16px" }} />
        )}
      </div>

      {/* Bottom Action Area */}
      <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "14px", marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <span style={{ 
          fontSize: "10px", 
          fontWeight: 800, 
          textTransform: "uppercase", 
          letterSpacing: "0.05em",
          color: "#7C6FC4"
        }}>
          {project.status === "in_progress" ? "in progress" : project.status}
        </span>

        {rightAction ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {rightAction}
          </motion.div>
        ) : (
          <Link 
            to={`/projects/${project._id}`} 
            style={{ 
              fontSize: "12px", 
              fontWeight: 800, 
              color: "#1a1a2e", 
              display: "flex", 
              alignItems: "center", 
              gap: "4px" 
            }}
          >
            Manage →
          </Link>
        )}
      </div>
    </motion.div>
  );
}