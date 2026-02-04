// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState(null);
  const { setUser } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const resp = await axiosClient.post("/auth/register", { name, email, password });
      const { user, token } = resp.data;
      setUser(user, token);
      nav("/jobs");
    } catch (e) {
      setErr(e?.message || "Registration failed");
    }
  };

  return (
    <div className="container pt-10">
    <div className="max-w-md mx-auto p-6 card">
      <h2 className="text-xl font-semibold mb-4 flex justify-center">Create Account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border px-3 py-2 rounded" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded" />
        <button className="px-43 py-2 bg-slate-900 text-white rounded hover:bg-slate-400 transition">Register</button>
      </form>
      {err && <div className="text-red-600 mt-3">{err}</div>}
    </div>
    </div>
  );
}
