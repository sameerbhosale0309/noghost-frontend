import { useEffect, useMemo, useState } from "react";
import http from "../api/http";
import Layout from "../components/layout";
import ProjectCard from "../components/projectcard";
import { motion } from "motion/react";

export default function FreelancerDashboard() {
  const [open, setOpen] = useState([]);
  const [mine, setMine] = useState([]);

  const [statusFilter, setStatusFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const a = await http.get("/projects/open");
    const b = await http.get("/projects/my");
    setOpen(a.data);
    setMine(b.data);
  };

  useEffect(() => {
    load();
  }, []);

  const accept = async (id) => {
    try {
      setBusyId(id);
      await http.put(`/projects/${id}/accept`);
      await load();
    } catch (e) {
      console.error("Accept project failed", e);
    } finally {
      setBusyId(null);
    }
  };

  const filteredMine = useMemo(() => {
    if (statusFilter === "all") return mine;
    return mine.filter((p) => p.status === statusFilter);
  }, [mine, statusFilter]);

  return (
    <Layout>
      {/* Premium Dashboard Header */}
      <div className="row" style={{ marginBottom: "32px", borderBottom: "1px solid rgba(26,26,26,0.04)", paddingBottom: "20px", alignItems: "flex-end" }}>
        <div>
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-0.03em" }}>
            Freelancer Dashboard
          </h2>
          <p className="muted">Find pre-funded contracts, submit work deliverables, and claim payments safely</p>
        </div>
      </div>

      {/* Grid: Left column (Marketplace), Right column (My Projects) */}
      <div className="bento-grid">
        
        {/* Left Side: Open Marketplace */}
        <div style={{ gridColumn: "span 6" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "18px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gradient-green)" }} />
            <h3 className="section-title" style={{ margin: 0, fontSize: "1.4rem" }}>
              Open Escrow Listings ({open.length})
            </h3>
          </div>

          {open.length === 0 ? (
            <motion.div 
              className="card"
              style={{ padding: "60px 20px", textAlign: "center", borderRadius: "28px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ fontSize: "2.5rem" }}>🛡️</span>
              <h4 style={{ fontWeight: 800, marginTop: "12px" }}>No open contracts</h4>
              <p className="muted" style={{ marginTop: "6px" }}>Check back later for newly funded client listings.</p>
            </motion.div>
          ) : (
            <div style={{ display: "grid", gap: "20px" }}>
              {open.map((p) => (
                <ProjectCard
                  key={p._id}
                  project={p}
                  rightAction={
                    <button 
                      className="btn btn-secondary" 
                      disabled={busyId === p._id}
                      onClick={() => accept(p._id)}
                      style={{ padding: "8px 18px", borderRadius: "99px" }}
                    >
                      {busyId === p._id ? "Accepting..." : "Accept"}
                    </button>
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: My Active Contracts */}
        <div style={{ gridColumn: "span 6" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gradient-pink)" }} />
              <h3 className="section-title" style={{ margin: 0, fontSize: "1.4rem" }}>
                My Contracts ({filteredMine.length})
              </h3>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ width: "130px", padding: "8px 12px", borderRadius: "99px", background: "white", boxShadow: "2px 2px 8px rgba(0,0,0,0.03)" }}
              >
                <option value="all">All</option>
                <option value="in_progress">Active</option>
                <option value="flagged">Flagged</option>
                <option value="completed">Done</option>
              </select>
            </div>
          </div>

          {filteredMine.length === 0 ? (
            <motion.div 
              className="card"
              style={{ padding: "60px 20px", textAlign: "center", borderRadius: "28px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span style={{ fontSize: "2.5rem" }}>💼</span>
              <h4 style={{ fontWeight: 800, marginTop: "12px" }}>No active contracts</h4>
              <p className="muted" style={{ marginTop: "6px" }}>Accept an escrow listing from the marketplace to get started.</p>
            </motion.div>
          ) : (
            <div style={{ display: "grid", gap: "20px" }}>
              {filteredMine.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}

        </div>

      </div>
    </Layout>
  );
}