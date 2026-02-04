// src/pages/CompanyRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../context/AuthContext";

export default function CompanyRegister() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [companyName,setCompanyName] = useState("");
  const [website,setWebsite] = useState("");
  const [location,setLocation] = useState("");
  const [description,setDescription] = useState("");
  const [err,setErr] = useState(null);
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const body = {
        name,
        email,
        password,
        company: {
          name: companyName,
          website,
          location,
          description
        }
      };
      const resp = await axiosClient.post("/auth/register-company", body);
      const { user, token } = resp.data;
      setUser(user, token);
      nav("/company"); // company dashboard
    } catch (e) {
      setErr(e?.message || "Registration failed");
    }
  };

  return (
    <div className="container pt-10">
    <div className="max-w-lg mx-auto p-6 card">
      <h2 className="text-xl font-semibold mb-4">Create company account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full border px-3 py-2 rounded" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded" />

        {/* <hr className="my-3" /> */}
        <input required value={companyName} onChange={e=>setCompanyName(e.target.value)} placeholder="Company name" className="w-full border px-3 py-2 rounded" />
        <input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="Website (optional)" className="w-full border px-3 py-2 rounded" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location (optional)" className="w-full border px-3 py-2 rounded" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Short description" className="w-full border px-3 py-2 rounded" />

        <button className="px-4 py-2 bg-slate-900 text-white rounded">Register Company</button>
      </form>
      {err && <div className="text-red-600 mt-3">{err}</div>}
    </div>
    </div>
  );
}
