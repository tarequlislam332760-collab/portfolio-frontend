import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminAbout from "./AdminAbout";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminBlog from "./AdminBlog";
import AdminTestimonials from "./AdminTestimonials";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";
import AdminServices from "./AdminServices";

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [authed, setAuthed]       = useState(false);
  const [checked, setChecked]     = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("admin_auth") === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 68px)", paddingTop: 68, background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} onLogout={() => { sessionStorage.removeItem("admin_auth"); sessionStorage.removeItem("admin_token"); setAuthed(false); }} />
      <div style={{ flex: 1, padding: "clamp(14px,3vw,32px)", overflow: "auto", minWidth: 0, width: "100%" }} className="admin-content">
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="projects"     element={<AdminProjects />} />
          <Route path="skills"       element={<AdminSkills />} />
          <Route path="blog"         element={<AdminBlog />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="messages"     element={<AdminMessages />} />
          <Route path="about" element={<AdminAbout />} />
              <Route path="profile"      element={<AdminProfile />} />
          <Route path="services"     element={<AdminServices />} />
        </Routes>
      </div>
      <style>{`
        @media(max-width:768px){.admin-content{padding-top:calc(52px + 14px)!important}}
      `}</style>
    </div>
  );
}
