import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ClientDashboard from "../pages/client";
import FreelancerDashboard from "../pages/freelancer";
import ProjectDetail from "../pages/project";
import Protected from "../components/protected";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/client"
        element={
          <Protected role="client">
            <ClientDashboard />
          </Protected>
        }
      />

      <Route
        path="/freelancer"
        element={
          <Protected role="freelancer">
            <FreelancerDashboard />
          </Protected>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <Protected>
            <ProjectDetail />
          </Protected>
        }
      />
    </Routes>
  );
}