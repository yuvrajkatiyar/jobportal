// src/pages/Apply.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosCLient";

export default function Apply() {
  const { id } = useParams();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [cover,setCover] = useState("");
  const [resume,setResume] = useState(null);
  const [status,setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("coverLetter", cover);
    if (resume) fd.append("resume", resume);

    try {
      const resp = await axiosClient.post(`/jobs/${id}/apply`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setStatus({ ok: true, msg: "Application submitted" });
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, msg: err?.message || "Failed to submit" });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#1E1E1E] rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Apply</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full border px-3 py-2 rounded" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Id" className="w-full border px-3 py-2 rounded" />
        <textarea value={cover} onChange={e=>setCover(e.target.value)} placeholder="Describe why you are suitable for this job" className="w-full border px-3 py-2 rounded" />
        {/* Resume Upload */}
<div className="mt-4">
  <label className="block text-sm font-medium mb-1">Upload Resume:</label>

  <label
    htmlFor="resume"
    className="px-4 py-2 bg-white text-black border border-slate-300 rounded cursor-pointer inline-block hover:bg-slate-400 transition"

  >
    Choose File
  </label>

  <input
    id="resume"
    type="file"
    accept=".pdf,.doc,.docx"
    className="hidden"
    onChange={(e) => setResume(e.target.files[0])}
  />

  {/* Show file name */}
  {resume && (
    <p className="text-sm text-slate-600 mt-2">
      Selected: <span className="font-medium">{resume.name}</span>
    </p>
  )}
</div>

        <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded">Submit</button>
      </form>
      {status && <div className={`mt-4 ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.msg}</div>}
    </div>
  );
}
