const fs = require('fs');

// পুরো রিঅ্যাক্ট কোডটিকে ব্যাকটিক ( ` ) এর ভেতর রাখা হয়েছে
const contactComponentContent = `import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" style={{ padding: "100px 40px", background: "#0B1120" }}>
      <h2 style={{ color: "#fff", fontSize: "42px", fontWeight: "800", textAlign: "center", marginBottom: "48px" }}>Get In Touch</h2>
      <div style={{ maxWidth: "560px", margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", padding: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input 
            placeholder="Name" 
            value={form.name} 
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
            style={{ padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", outline: "none" }} 
          />
          <button 
            onClick={handle} 
            style={{ background: "linear-gradient(135deg,#00C896,#38BDF8)", border: "none", color: "#0B1120", padding: "14px", borderRadius: "10px", cursor: "pointer", fontWeight: "700" }}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;`;

// ফাইল রাইট করা
fs.writeFileSync("src/components/sections/Contact.jsx", contactComponentContent);
console.log("Contact done");