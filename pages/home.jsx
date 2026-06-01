import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "../components/layout";
import { motion } from "motion/react";
import http from "../api/http";
import { 
  Wallet, 
  Workflow, 
  ShieldCheck, 
  Briefcase, 
  Code2, 
  AlertTriangle 
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [stats, setStats] = useState({
    totalEscrowProtected: 0,
    securedProjects: 0,
    disputelessRate: 100.0,
    antiGhostingSafe: 100
  });

  useEffect(() => {
    if (!loading && user) {
      nav(user.role === "client" ? "/client" : "/freelancer", { replace: true });
    }
  }, [user, loading, nav]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await http.get("/projects/public-stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch public stats:", err);
      }
    };
    fetchStats();
  }, []);

  const formatEscrow = (val) => {
    return `$${val.toLocaleString()}`;
  };

  const formatProjects = (val) => {
    return val.toLocaleString();
  };

  return (
    <Layout fullWidth={true}>
      <div style={{ 
        position: "relative", 
        width: "100%", 
        minHeight: "100vh", 
        overflow: "hidden", 
        background: "#EDEAE4",
        padding: "0 24px", 
        boxSizing: "border-box" 
      }}>
        {/* Luxury grain overlay and organic back-lighting */}
        <div className="noise-overlay" />
        <div style={{ position: "absolute", top: "10%", left: "-10%", pointerEvents: "none" }}>
          <div className="ambient-glow-purple" />
        </div>
        <div style={{ position: "absolute", top: "40%", right: "-10%", pointerEvents: "none" }}>
          <div className="ambient-glow-cream" />
        </div>

        {/* Scattered 3D Animated Orbs (Hides automatically on mobile via CSS) */}
        <div className="silver-glitter-ball float-slow-1" style={{ width: "90px", height: "90px", top: "8%", left: "50%", zIndex: 0 }} />
        <div className="glass-sphere float-slow-2" style={{ width: "120px", height: "120px", top: "62%", left: "5%", zIndex: 0 }} />
        <div className="purple-glossy-sphere float-slow-3" style={{ width: "100px", height: "100px", top: "20%", right: "5%", zIndex: 0 }} />
        <div className="glass-sphere float-slow-1" style={{ width: "60px", height: "60px", bottom: "15%", right: "45%", zIndex: 0 }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 0" }}>
          
          {/* 1. Hero Section: Split Layout Grid */}
          <div className="grid-2-col" style={{ position: "relative", zIndex: 2, paddingTop: "20px", paddingBottom: "60px" }}>
            
            {/* Left Hero Card */}
            <motion.div 
              className="glass-card"
              style={{ padding: "48px 40px", borderRadius: "32px", display: "flex", flexDirection: "column", gap: "24px" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#1a1a2e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                  <span style={{ color: "#ffffff", fontFamily: "'Outfit', sans-serif", fontSize: "13px", fontWeight: 900, letterSpacing: "-0.03em" }}>NG</span>
                </div>
                <span style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: "1.4rem", color: "#1a1a2e", letterSpacing: "-0.02em" }}>NoGhost</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <span className="badge badge-progress" style={{ fontSize: "10px", fontWeight: 800 }}>⚡ FREELANCER ACCOUNTABILITY PLATFORM</span>
                <h1 style={{ 
                  fontFamily: "'Outfit', sans-serif", 
                  fontSize: "3.6rem", 
                  fontWeight: 900, 
                  lineHeight: 1.05, 
                  letterSpacing: "-0.04em",
                  color: "#1a1a2e",
                  margin: 0
                }}>
                  Secure your hires.<br />
                  <span style={{ color: "#7C6FC4" }}>Pay as you approve.</span>
                </h1>
              </div>

              <p className="muted" style={{ fontSize: "16px", lineHeight: "1.6", color: "#5b5b75", margin: 0 }}>
                fund milestones in escrow. track progress. auto-flag inactivity. NoGhost keeps everyone accountable.
              </p>

              <div style={{ display: "flex", gap: "14px", marginTop: "8px" }}>
                <Link to="/register" className="btn btn-primary" style={{ padding: "14px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 700 }}>
                  get started
                </Link>
                <Link to="/login" className="btn" style={{ padding: "14px 28px", borderRadius: "99px", fontSize: "14px", fontWeight: 700, background: "#1a1a2e", color: "white", border: "none" }}>
                  login
                </Link>
              </div>

              {/* Trust Strip */}
              <div style={{ 
                borderTop: "1px solid rgba(26,26,46,0.06)", 
                paddingTop: "16px", 
                marginTop: "8px", 
                fontSize: "12px", 
                color: "#7C6FC4", 
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <ShieldCheck size={16} />
                <span>Securing {formatEscrow(stats.totalEscrowProtected)} in freelance milestone contracts globally.</span>
              </div>
            </motion.div>

            {/* Right Hero Cards Stack */}
            <div style={{ 
              position: "relative", 
              width: "100%", 
              height: "440px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center" 
            }} className="hero-right-container">
              
              {/* Card 1 (Back, Purple Gradient Card) */}
              <motion.div 
                className="card"
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: "340px",
                  height: "260px",
                  left: "5%",
                  top: "10%",
                  background: "var(--gradient-purple)",
                  color: "white",
                  borderRadius: "28px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 20px 40px rgba(124, 111, 196, 0.25)",
                  border: "none",
                  zIndex: 1,
                  transform: "rotate(-5deg)"
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: "99px" }}>Escrow Contract</span>
                    <span style={{ fontSize: "9px", fontWeight: 800, background: "#ffffff", color: "#7C6FC4", padding: "4px 10px", borderRadius: "99px" }}>Stripe Checkout</span>
                  </div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.4rem", fontWeight: 800, margin: "20px 0 4px 0", color: "white" }}>Visio UA</h3>
                  <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>Milestone Escrow Vault</p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "16px", fontWeight: 900 }}>$12,500 USD</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, opacity: 0.9 }}>Safe Escrow ✓</span>
                </div>
              </motion.div>

              {/* Card 2 (Front, White Glass Card) */}
              <motion.div 
                className="glass-card"
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: "340px",
                  height: "280px",
                  right: "5%",
                  bottom: "5%",
                  borderRadius: "28px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  zIndex: 2,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px)",
                  transform: "rotate(3deg)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08), inset 0 1px 1px white"
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: 15 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Corner floating purple glossy orb overlapping */}
                <div className="purple-glossy-sphere float-slow-2" style={{
                  position: "absolute",
                  width: "36px",
                  height: "36px",
                  top: "-18px",
                  left: "-18px"
                }} />

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#7C6FC4", background: "rgba(124,111,196,0.08)", padding: "4px 10px", borderRadius: "99px" }}>Live Project</span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, background: "rgba(34,197,94,0.1)", color: "#22C55E", padding: "2px 6px", borderRadius: "99px" }}>funded ✓</span>
                      <span style={{ fontSize: "9px", fontWeight: 700, background: "rgba(34,197,94,0.1)", color: "#22C55E", padding: "2px 6px", borderRadius: "99px" }}>approved ✓</span>
                    </div>
                  </div>
                  
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 800, margin: "16px 0 4px 0", color: "#1a1a2e" }}>landing page redesign</h3>
                  <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#5b5b75", margin: "0 0 8px 0" }}>milestone 2 of 4 approved</h4>
                </div>

                <div style={{ width: "100%", margin: "8px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", fontWeight: 700, marginBottom: "4px", color: "#5b5b75" }}>
                    <span>Milestone Progress</span>
                    <span>50% Complete</span>
                  </div>
                  <div style={{ height: "5px", background: "rgba(0,0,0,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: "50%", height: "100%", background: "#7C6FC4", borderRadius: "99px" }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#7C6FC4", color: "white", fontSize: "9px", fontWeight: 800, display: "flex", alignItems: "center", justifyCenter: "center", display: "flex", justifyContent: "center" }}>
                      S
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a2e" }}>samfree (freelancer)</span>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#7C6FC4" }}>$5,000 Contract</span>
                </div>
              </motion.div>

            </div>

          </div>

          {/* 2. Interactive Step Grid: How It Works */}
          <div style={{ marginBottom: "80px", position: "relative", zIndex: 2 }}>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "8px" }}>
              how NoGhost works
            </h2>
            <p className="muted" style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 40px auto" }}>
              Every contract milestone is secured with a modern escrow mechanism, eliminating trust friction.
            </p>

            <div className="grid-3-col" style={{ gap: "24px" }}>
              
              <div className="glass-card" style={{ padding: "32px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(168,230,207,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wallet size={20} color="#3E8B6F" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 8px 0", color: "#1a1a2e" }}>1. Escrow Funding</h3>
                  <p className="muted" style={{ margin: 0, fontSize: "13.5px" }}>
                    client creates project + milestones and funds each milestone securely using Stripe checkout.
                  </p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "32px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,223,211,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Workflow size={20} color="#B36B4D" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 8px 0", color: "#1a1a2e" }}>2. Secure Delivery</h3>
                  <p className="muted" style={{ margin: 0, fontSize: "13.5px" }}>
                    freelancer is notified and can submit deliverables only after active milestone funding is cleared in vault.
                  </p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "32px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(124,111,196,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={20} color="#7C6FC4" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.2rem", fontWeight: 800, margin: "0 0 8px 0", color: "#1a1a2e" }}>3. Escrow Approval</h3>
                  <p className="muted" style={{ margin: 0, fontSize: "13.5px" }}>
                    client approves deliverables to release milestone payments. Project completes upon all milestone approvals.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Pulsing Inactivity Flag Section (Anti-Ghosting System) */}
          <div className="grid-2-col" style={{ marginBottom: "80px", position: "relative", zIndex: 2 }}>
            
            {/* Left Flag Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <span className="badge badge-flagged" style={{ fontSize: "10px", fontWeight: 800 }}>🛡️ ANTI-GHOSTING PROTECTION</span>
              <h2 style={{ fontFamily: "Outfit", fontSize: "2.4rem", fontWeight: 900, color: "#1a1a2e", margin: 0, letterSpacing: "-0.03em" }}>
                Active Inactivity Monitoring System
              </h2>
              <p className="muted" style={{ fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
                NoGhost monitors last activity on every project. if no action is taken, automated inactive flags protect capital from stalling, keeping projects on track.
              </p>
              
              <div style={{ display: "flex", gap: "12px", alignItems: "center", background: "rgba(255,255,255,0.4)", padding: "12px 18px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.5)" }}>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#EF4444",
                    boxShadow: "0 0 8px #EF4444"
                  }}
                />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a2e" }}>Auto-Flagging engine actively scanning workspace...</span>
              </div>
            </div>

            {/* Right Mockup Card with pulsing light */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="glass-card" style={{ width: "100%", maxWidth: "360px", padding: "24px", borderRadius: "28px", border: "1px solid rgba(239,68,68,0.25)", boxShadow: "0 20px 40px rgba(239,68,68,0.06)" }}>
                
                {/* Red warning banner */}
                <div style={{ 
                  background: "rgba(239,68,68,0.1)", 
                  border: "1px solid rgba(239,68,68,0.2)", 
                  color: "#EF4444", 
                  padding: "8px 12px", 
                  borderRadius: "12px", 
                  fontSize: "11px", 
                  fontWeight: 800, 
                  textAlign: "center",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}>
                  <AlertTriangle size={14} />
                  <span>PROJECT INACTIVE - FLAGGED ⚠</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.1rem", fontWeight: 800, color: "#1a1a2e", margin: 0 }}>Mobile App Integration</h3>
                  {/* Pulsing red indicator light */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <motion.span 
                      animate={{ opacity: [0.3, 1, 0.3] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }} 
                      style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#EF4444", display: "inline-block", boxShadow: "0 0 6px #EF4444" }} 
                    />
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#EF4444" }}>Flagged</span>
                  </div>
                </div>

                <p className="muted" style={{ fontSize: "12.5px", marginBottom: "16px" }}>
                  Last freelancer submission was 14 days ago. Project automatically flagged as inactive. Capital refund protection eligible.
                </p>

                <div style={{ height: "4px", background: "rgba(0,0,0,0.04)", borderRadius: "99px", overflow: "hidden", marginBottom: "16px" }}>
                  <div style={{ width: "25%", height: "100%", background: "#EF4444", borderRadius: "99px" }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#5b5b75" }}>Milestone 1 of 4 approved</span>
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#EF4444", background: "rgba(239,68,68,0.08)", padding: "4px 10px", borderRadius: "99px" }}>
                    $10,000 Vault
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* 4. Side-by-Side Comparative Roles */}
          <div style={{ marginBottom: "80px", position: "relative", zIndex: 2 }}>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "8px" }}>
              designed for modern workspaces
            </h2>
            <p className="muted" style={{ textAlign: "center", maxWidth: "580px", margin: "0 auto 40px auto" }}>
              Specific, tailored matrices and tools to satisfy both client protections and freelancer cashflow guarantees.
            </p>

            <div className="grid-2-col" style={{ gap: "32px" }}>
              
              {/* Client Card */}
              <div className="glass-card bg-pastel-green" style={{ padding: "40px", borderRadius: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <Briefcase size={22} color="#3E8B6F" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 900, margin: "0 0 10px 0", color: "#1a1a2e" }}>For Clients</h3>
                  <ul style={{ paddingLeft: "20px", lineHeight: "2.0", color: "#3e3e5c", fontSize: "14px", marginBottom: "24px" }}>
                    <li>Fund milestones securely in escrow</li>
                    <li>Review and approve deliverables before payout release</li>
                    <li>Capital safeguards with auto-flagged inactive alerts</li>
                    <li>Simple dispute mitigation vaulting</li>
                  </ul>
                  <Link to="/register" className="btn" style={{ padding: "12px 24px", borderRadius: "99px", background: "#1a1a2e", color: "white", border: "none", fontSize: "13px" }}>
                    Register as Client
                  </Link>
                </div>
              </div>

              {/* Freelancer Card */}
              <div className="glass-card bg-pastel-blue" style={{ padding: "40px", borderRadius: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                  <Code2 size={22} color="#7C6FC4" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 900, margin: "0 0 10px 0", color: "#1a1a2e" }}>For Freelancers</h3>
                  <ul style={{ paddingLeft: "20px", lineHeight: "2.0", color: "#3e3e5c", fontSize: "14px", marginBottom: "24px" }}>
                    <li>Guaranteed payouts upon deliverable approval</li>
                    <li>Commence project work only on active funded milestones</li>
                    <li>Avoid billing friction and collection follow-ups</li>
                    <li>Professional reputation metrics profile</li>
                  </ul>
                  <Link to="/register" className="btn" style={{ padding: "12px 24px", borderRadius: "99px", background: "#1a1a2e", color: "white", border: "none", fontSize: "13px" }}>
                    Register as Contractor
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* 5. Stats Strip Banner */}
          <motion.div 
            className="grid-stats"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              borderRadius: "28px",
              padding: "32px",
              boxShadow: "var(--shadow-neo)",
              marginBottom: "80px",
              position: "relative",
              zIndex: 2
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 900, fontFamily: "Outfit", color: "#1a1a2e", margin: 0 }}>{formatEscrow(stats.totalEscrowProtected)}</h3>
              <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>Escrow Protected</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 900, fontFamily: "Outfit", color: "#1a1a2e", margin: 0 }}>{formatProjects(stats.securedProjects)}</h3>
              <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>Secured Projects</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 900, fontFamily: "Outfit", color: "#1a1a2e", margin: 0 }}>{stats.disputelessRate}%</h3>
              <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>Disputeless Rate</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontSize: "2.2rem", fontWeight: 900, fontFamily: "Outfit", color: "#1a1a2e", margin: 0 }}>{stats.antiGhostingSafe}%</h3>
              <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>Anti-Ghosting Safe</p>
            </div>
          </motion.div>

          {/* 6. Robust Detailed Footer */}
          <div className="grid-footer" style={{ borderTop: "1px solid rgba(26,26,46,0.06)", paddingTop: "40px", paddingBottom: "40px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyCenter: "center", display: "flex", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: "10px", fontWeight: 900, fontFamily: "Outfit" }}>NG</span>
                </div>
                <span style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: "1.1rem", color: "#1a1a2e" }}>NoGhost</span>
              </div>
              <p className="muted" style={{ fontSize: "12px", margin: 0 }}>Escrow-protected contracting and milestone-based approvals.</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "Outfit", fontWeight: 800, margin: "0 0 12px 0", fontSize: "14px", color: "#1a1a2e" }}>Product</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                <Link to="/login" className="muted" style={{ textDecoration: "none" }}>Milestone Escrow</Link>
                <Link to="/login" className="muted" style={{ textDecoration: "none" }}>Inactivity Flagging</Link>
                <Link to="/register" className="muted" style={{ textDecoration: "none" }}>Secured Vault</Link>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Outfit", fontWeight: 800, margin: "0 0 12px 0", fontSize: "14px", color: "#1a1a2e" }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                <span className="muted">About Us</span>
                <span className="muted">Platform Trust</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Outfit", fontWeight: 800, margin: "0 0 12px 0", fontSize: "14px", color: "#1a1a2e" }}>Legal</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                <span className="muted">Terms of Escrow</span>
                <span className="muted">Privacy Policy</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
              <p className="muted" style={{ fontSize: "12px", margin: 0, textAlign: "right" }}>Made with 🤍 in India for the global workforce.</p>
              <p className="muted" style={{ fontSize: "12px", margin: 0 }}>© 2025 NoGhost. All rights reserved.</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
