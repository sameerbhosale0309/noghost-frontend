import { motion } from "motion/react";

export default function MilestoneCard({
  ms,
  userRole,
  onFund,
  onSubmit,
  onApprove,
  busy
}) {
  const pay = ms.paymentStatus || "unfunded";
  const isPaid = pay === "paid";

  const paidAt = ms.paidAt ? new Date(ms.paidAt).toLocaleString() : null;

  const canFund = userRole === "client" && !isPaid;
  const canSubmit = userRole === "freelancer" && ms.status === "pending" && isPaid;
  const canApprove = userRole === "client" && ms.status === "submitted";

  return (
    <motion.div 
      className="card"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        borderLeft: isPaid 
          ? "6px solid #A8E6CF" 
          : "6px solid #FFB3BA"
      }}
    >
      <div className="row" style={{ alignItems: "center" }}>
        <div>
          <div className="card-title" style={{ fontSize: "1.15rem", fontWeight: 800 }}>
            {ms.title}
          </div>
          <div className="kv" style={{ gridTemplateColumns: "100px 1fr", marginTop: "8px", gap: "4px 8px" }}>
            <span className="k" style={{ fontSize: "12px" }}>Amount</span>
            <span className="v" style={{ fontSize: "12px", fontWeight: 800 }}>${ms.amount}</span>

            <span className="k" style={{ fontSize: "12px" }}>Status</span>
            <span className="v" style={{ fontSize: "12px" }}>
              <span className={`badge ${ms.status === "approved" ? "badge-completed" : ms.status === "submitted" ? "badge-progress" : "badge-open"}`} style={{ padding: "2px 8px", fontSize: "10px" }}>
                {ms.status}
              </span>
            </span>

            <span className="k" style={{ fontSize: "12px" }}>Payment</span>
            <span className="v" style={{ fontSize: "12px", fontWeight: 700 }}>
              <span style={{ color: isPaid ? "#2B7A5D" : "#C94C57" }}>{pay}</span>
              {paidAt ? <span className="muted" style={{ fontWeight: 400, fontSize: "11px" }}> (funded {paidAt})</span> : ""}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {canFund ? (
            <motion.button
              className="btn btn-primary"
              disabled={busy}
              onClick={() => onFund(ms._id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: "99px", padding: "8px 20px" }}
            >
              {busy ? "Processing..." : "Fund Milestone"}
            </motion.button>
          ) : null}

          {canSubmit ? (
            <motion.button
              className="btn btn-secondary"
              disabled={busy}
              onClick={() => onSubmit(ms._id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: "99px", padding: "8px 20px" }}
            >
              {busy ? "Submitting..." : "Submit Deliverable"}
            </motion.button>
          ) : null}

          {userRole === "freelancer" && ms.status === "pending" && !isPaid ? (
            <span className="badge" style={{ backgroundColor: "rgba(26,26,26,0.03)", color: "var(--muted)", borderColor: "rgba(26,26,26,0.06)", fontSize: "11px" }}>
              Waiting for client funding
            </span>
          ) : null}

          {canApprove ? (
            <motion.button
              className="btn btn-secondary"
              disabled={busy}
              onClick={() => onApprove(ms._id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ borderRadius: "99px", padding: "8px 20px" }}
            >
              {busy ? "Approving..." : "Approve & Release"}
            </motion.button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}