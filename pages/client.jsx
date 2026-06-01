import { useEffect, useMemo, useState } from "react";
import http from "../api/http";
import Layout from "../components/layout";
import ProjectCard from "../components/projectcard";
import { motion } from "motion/react";

export default function ClientDashboard() {
  const [list, setList] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [err, setErr] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");

  const load = async () => {
    const res = await http.get("/projects/my");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    setErr("");

    if (!title.trim()) return setErr("Project title is required");
    if (Number(budget) <= 0) return setErr("Budget must be greater than 0");

    setLoadingCreate(true);
    try {
      await http.post("/projects", {
        title,
        description,
        budget: Number(budget)
      });
      setTitle("");
      setDescription("");
      setBudget(0);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Failed to create project");
    } finally {
      setLoadingCreate(false);
    }
  };

  const filtered = useMemo(() => {
    if (statusFilter === "all") return list;
    return list.filter((p) => p.status === statusFilter);
  }, [list, statusFilter]);

  return (
    <Layout>
      {/* Premium Dashboard Header */}
      <div className="row" style={{ marginBottom: "32px", borderBottom: "1px solid rgba(26,26,26,0.04)", paddingBottom: "20px", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-0.03em" }}>
            Client Dashboard
          </h2>
          <p className="muted">Secure your freelance hires and manage milestone escrow payments</p>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="muted" style={{ fontWeight: 700, fontSize: "12px", textTransform: "uppercase" }}>Filter Status</span>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "160px", padding: "10px 14px", borderRadius: "99px", background: "white", boxShadow: "2px 2px 8px rgba(0,0,0,0.03)" }}
          >
            <option value="all">All Projects</option>
            <option value="open">Open Listings</option>
            <option value="in_progress">In Progress</option>
            <option value="flagged">Flagged / Inactive</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Two-column Bento Grid Layout */}
      <div className="bento-grid">
        
        {/* Left Side: Create Project Card */}
        <motion.div 
          className="card" 
          style={{ gridColumn: "span 4", height: "fit-content", borderRadius: "28px" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Accent header */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gradient-pink)" }} />
            <h3 className="card-title" style={{ margin: 0, fontSize: "1.2rem" }}>Create New Project</h3>
          </div>

          <form onSubmit={create} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Project Title</label>
              <input 
                placeholder="e.g. Design Landing Page" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Brief Description</label>
              <textarea 
                placeholder="Detail what needs to be delivered..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                style={{ width: "100%", padding: "14px 18px", border: "1px solid rgba(26,26,26,0.08)", borderRadius: "12px", outline: "none", background: "#FCFCFC", boxSizing: "border-box", fontSize: "14px", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Total Budget ($USD)</label>
              <input 
                placeholder="500" 
                type="number" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                required
              />
            </div>

            {err ? (
              <p style={{ color: "crimson", fontSize: "13px", fontWeight: 600 }}>{err}</p>
            ) : null}

            <motion.button 
              className="btn btn-primary" 
              type="submit"
              disabled={loadingCreate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: "100%", borderRadius: "99px", marginTop: "8px" }}
            >
              {loadingCreate ? "Creating..." : "Create Project"}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Side: My Projects List */}
        <div style={{ gridColumn: "span 8" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <h3 className="section-title" style={{ margin: 0, fontSize: "1.4rem" }}>
              My Protected Projects ({filtered.length})
            </h3>
          </div>

          {filtered.length === 0 ? (
            <motion.div 
              className="card"
              style={{ padding: "60px 20px", textAlign: "center", borderRadius: "28px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ fontSize: "2.5rem" }}>📁</span>
              <h4 style={{ fontWeight: 800, marginTop: "12px" }}>No projects found</h4>
              <p className="muted" style={{ marginTop: "6px" }}>Use the panel on the left to create and secure your first contract.</p>
            </motion.div>
          ) : (
            <div className="grid">
              {filtered.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
}