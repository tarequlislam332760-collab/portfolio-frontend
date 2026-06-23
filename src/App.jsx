import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";

export default function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div style={{ opacity: 1, animation: "fadeUp 0.5s ease both" }}>
        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
