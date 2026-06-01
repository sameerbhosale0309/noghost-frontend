import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import http from "../api/http";
import { useAuth } from "../context/auth";
import Layout from "../components/layout";
import MilestoneCard from "../components/milestonecard";
import { motion, AnimatePresence } from "motion/react";

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [searchParams] = useSearchParams();
  const payStatus = searchParams.get("pay"); // success | cancel | null

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [err, setErr] = useState("");

  const [msTitle, setMsTitle] = useState("");
  const [msAmount, setMsAmount] = useState(0);

  // per-action loading
  const [busyId, setBusyId] = useState(null); // milestone id for fund/submit/approve
  const [busyComplete, setBusyComplete] = useState(false);
  const [busyCreate, setBusyCreate] = useState(false);

  const load = async () => {
    const p = await http.get(`/projects/${id}`);
    const m = await http.get(`/milestones/${id}`);
    setProject(p.data);
    setMilestones(m.data);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (payStatus === "success") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payStatus]);

  const allApproved =
    milestones.length > 0 && milestones.every((m) => m.status === "approved");

  const canComplete =
    user?.role === "client" &&
    project?.status === "in_progress" &&
    allApproved;

  const paymentStats = useMemo(() => {
    const total = milestones.reduce((sum, m) => sum + Number(m.amount || 0), 0);
    const funded = milestones
      .filter((m) => m.paymentStatus === "paid")
      .reduce((sum, m) => sum + Number(m.amount || 0), 0);
    const fundedCount = milestones.filter((m) => m.paymentStatus === "paid").length;

    return {
      total,
      funded,
      fundedCount,
      milestoneCount: milestones.length
    };
  }, [milestones]);

  const addMilestone = async (e) => {
    e.preventDefault();
    setErr("");

    if (!msTitle.trim()) return setErr("milestone title required");
    if (Number(msAmount) <= 0) return setErr("milestone amount must be > 0");

    try {
      setBusyCreate(true);
      await http.post(`/milestones/${id}`, {
        title: msTitle,
        amount: Number(msAmount)
      });
      setMsTitle("");
      setMsAmount(0);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "failed to add milestone");
    } finally {
      setBusyCreate(false);
    }
  };

  const fund = async (msId) => {
    setErr("");
    try {
      setBusyId(msId);
      const res = await http.post(`/payments/milestones/${msId}/checkout`);
      window.location.href = res.data.url;
    } catch (e2) {
      setErr(e2?.response?.data?.message || "failed to start payment");
      setBusyId(null);
    }
  };

  const submit = async (msId) => {
    setErr("");
    try {
      setBusyId(msId);
      await http.put(`/milestones/${msId}/submit`);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "failed to submit milestone");
    } finally {
      setBusyId(null);
    }
  };

  const approve = async (msId) => {
    setErr("");
    try {
      setBusyId(msId);
      await http.put(`/milestones/${msId}/approve`);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "failed to approve milestone");
    } finally {
      setBusyId(null);
    }
  };

  const complete = async () => {
    setErr("");
    try {
      setBusyComplete(true);
      await http.put(`/projects/${id}/complete`);
      await load();
    } catch (e2) {
      setErr(e2?.response?.data?.message || "failed to complete");
    } finally {
      setBusyComplete(false);
    }
  };

  if (!project) return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div className="muted" style={{ fontSize: "1.2rem", fontWeight: 700 }}>Loading project details...</div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      {/* Title & Description Header Panel */}
      <div className="card" style={{ padding: "32px", borderRadius: "32px", marginBottom: "24px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "4px", width: "100%", background: "var(--gradient-pink)" }} />
        
        <div className="row" style={{ alignItems: "flex-start", marginBottom: "14px" }}>
          <div>
            <span className="muted" style={{ fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Project Title</span>
            <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.03em", marginTop: "4px" }}>{project.title}</h2>
          </div>
          <span className={`badge ${project.status === "completed" ? "badge-completed" : project.status === "flagged" ? "badge-flagged" : "badge-progress"}`}>
            {project.status === "in_progress" ? "in progress" : project.status}
          </span>
        </div>

        <span className="muted" style={{ fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</span>
        <p className="muted" style={{ color: "var(--text)", fontSize: "15px", marginTop: "4px", lineHeight: 1.6 }}>{project.description || "No description provided."}</p>
      </div>

      {/* Bento Grid panels */}
      <div className="bento-grid" style={{ marginBottom: "32px" }}>
        
        {/* Card 1: Key Project Metrics */}
        <div className="card" style={{ gridColumn: "span 6", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "28px" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gradient-green)" }} />
              <h3 className="card-title" style={{ margin: 0, fontSize: "1.2rem" }}>Contract Valuation & Payments</h3>
            </div>

            <div className="kv" style={{ gap: "16px 20px" }}>
              <span className="k">Total Budget</span>
              <span className="v" style={{ fontSize: "1.1rem", fontWeight: 800 }}>${project.budget}</span>

              <span className="k">Funded Escrow</span>
              <span className="v" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#2B7A5D" }}>
                ${paymentStats.funded} of ${paymentStats.total}
              </span>

              <span className="k">Paid Milestones</span>
              <span className="v">
                {paymentStats.fundedCount} of {paymentStats.milestoneCount} milestones pre-funded
              </span>
            </div>
          </div>

          {/* Payment alerts (checkout results) */}
          <div style={{ marginTop: "20px" }}>
            <AnimatePresence>
              {payStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="badge badge-completed"
                  style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                >
                  🎉 Payment successful! Funding updated securely.
                </motion.div>
              )}
              {payStatus === "cancel" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="badge badge-flagged"
                  style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                >
                  ⚠️ Payment checkout cancelled.
                </motion.div>
              )}
            </AnimatePresence>

            {project.status === "flagged" && (
              <div className="card bg-gradient-pink" style={{ padding: "16px", borderRadius: "20px", marginTop: "14px", border: "none" }}>
                <span className="badge badge-flagged" style={{ marginBottom: "8px", border: "none" }}>Inactivity Flag</span>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>This contract has been flagged for inactivity.</p>
                <p className="muted" style={{ fontSize: "12px", color: "#4A4A4A", marginTop: "2px" }}>Performing an action (funding, submitting deliverables, or approvals) will instantly unflag it.</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Actions (Milestone Creation or Complete project trigger) */}
        {user?.role === "client" ? (
          <div className="card" style={{ gridColumn: "span 6", borderRadius: "28px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--gradient-pink)" }} />
              <h3 className="card-title" style={{ margin: 0, fontSize: "1.2rem" }}>Add Milestone Escrow</h3>
            </div>

            <form onSubmit={addMilestone} style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gap: 4 }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Milestone Title</label>
                <input 
                  placeholder="e.g. First Draft / Wireframes" 
                  value={msTitle} 
                  onChange={(e) => setMsTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gap: 4 }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--muted)" }}>Milestone Escrow Value ($USD)</label>
                <input 
                  placeholder="250" 
                  type="number" 
                  value={msAmount} 
                  onChange={(e) => setMsAmount(e.target.value)}
                  required
                />
              </div>

              {err ? <p style={{ color: "crimson", fontSize: "13px", fontWeight: 600 }}>{err}</p> : null}

              <motion.button 
                className="btn btn-primary" 
                type="submit" 
                disabled={busyCreate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: "100%", borderRadius: "99px", marginTop: "4px" }}
              >
                {busyCreate ? "Adding..." : "Add Milestone"}
              </motion.button>
            </form>

            <hr />

            <div style={{ display: "grid", gap: 8 }}>
              <motion.button
                className="btn btn-secondary"
                onClick={complete}
                disabled={!canComplete || busyComplete}
                whileHover={canComplete ? { scale: 1.02 } : {}}
                whileTap={canComplete ? { scale: 0.98 } : {}}
                style={{ width: "100%", borderRadius: "99px" }}
              >
                {busyComplete ? "Completing contract..." : "Mark Project Completed"}
              </motion.button>
              
              {!canComplete && (
                <p className="muted" style={{ fontSize: "12px", textAlign: "center" }}>
                  To complete: All milestones must be approved by you.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="card bg-gradient-pink" style={{ gridColumn: "span 6", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", borderRadius: "28px", border: "none" }}>
            <span style={{ fontSize: "3rem" }}>🛡️</span>
            <h3 className="card-title" style={{ marginTop: "12px", color: "#1A1A1A" }}>Escrow Protected Workspace</h3>
            <p className="muted" style={{ color: "#4A4A4A", maxWidth: "340px", marginTop: "6px" }}>
              Submit your milestone deliverables on the right panel once the client has loaded funds into the escrow balance.
            </p>
          </div>
        )}

      </div>

      {/* Milestones list section */}
      <h3 className="section-title" style={{ fontSize: "1.6rem" }}>
        Milestone Escrows
      </h3>

      {milestones.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center", borderRadius: "28px" }}>
          <span style={{ fontSize: "2rem" }}>📜</span>
          <h4 style={{ fontWeight: 800, marginTop: "12px" }}>No milestone escrows added</h4>
          {user?.role === "client" ? (
            <p className="muted" style={{ marginTop: "4px" }}>Add a milestone above to start pre-funding this project.</p>
          ) : (
            <p className="muted" style={{ marginTop: "4px" }}>Waiting for the client to register the first milestone.</p>
          )}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {milestones.map((ms) => (
            <MilestoneCard
              key={ms._id}
              ms={ms}
              userRole={user?.role}
              onFund={fund}
              onSubmit={submit}
              onApprove={approve}
              busy={busyId === ms._id}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}