import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../api/http";
import { useAuth } from "../context/auth";
import Layout from "../components/layout";
import { motion } from "motion/react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await http.post("/auth/register", { name, email, password, role });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      nav(res.data.user.role === "client" ? "/client" : "/freelancer");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout authPage={true}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        
        {/* Bento Grid card for Register */}
        <motion.div 
          className="card"
          style={{ width: "100%", padding: "28px 32px", borderRadius: "32px", position: "relative" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo Brand Title */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.8rem", fontWeight: 900, color: "#1a1a2e", margin: 0 }}>NoGhost</h2>
            <p className="muted" style={{ margin: "4px 0 0 0", fontSize: "13px", fontWeight: 500 }}>Create your secured account</p>
          </div>

          <form onSubmit={onSubmit} style={{ display: "grid", gap: "12px" }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>Full Name</label>
              <input 
                placeholder="John Doe" 
                type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>Email Address</label>
              <input 
                placeholder="you@example.com" 
                type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>Password</label>
              <input 
                placeholder="••••••••" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)" }}>Select Workspace Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="client">Client (Fund projects & milestones)</option>
                <option value="freelancer">Freelancer (Deliver work & claim funds)</option>
              </select>
            </div>

            {err ? (
              <motion.p 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                style={{ color: "crimson", fontSize: "13px", fontWeight: 600, margin: 0 }}
              >
                {err}
              </motion.p>
            ) : null}

            <motion.button 
              className="btn btn-secondary" 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: "100%", borderRadius: "99px", marginTop: "8px" }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <hr style={{ margin: "16px 0", border: "0", borderTop: "1px solid rgba(26,26,26,0.06)" }} />

          <p className="muted" style={{ textAlign: "center", fontSize: "13px", margin: 0 }}>
            Already have an account? <Link to="/login" style={{ color: "#3E8B6F", fontWeight: 700 }}>Login here</Link>
          </p>
        </motion.div>

      </div>
    </Layout>
  );
}