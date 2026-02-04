// src/pages/CompanyDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosCLient";
import { useAuth } from "../context/AuthContext";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [title,setTitle] = useState("");
  const [location,setLocation] = useState("");
  const [type,setType] = useState("Full-time");
  const [tags,setTags] = useState("");
  const [salary,setSalary] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [msg,setMsg] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs(){
    try {
      setLoading(true);
      // fetch jobs created by this company if backend supports filter createdBy
      // fallback: get all jobs and filter by createdBy if necessary
      const resp = await axiosClient.get("/jobs", { params: { createdBy: user?.id } });
      // resp.data.jobs expected; fallback to resp.data
      const result = resp.data.jobs ?? resp.data;
      // if API doesn't support createdBy filter, filter client-side:
      const filtered = result.filter(j => (j.createdBy?._id ?? j.createdBy) === (user?.id || user?._id));
      setJobs(filtered);
    } catch (e) {
      console.error(e);
      setJobs([]);
    } finally { setLoading(false); }
  }

  async function submit(e){
    e.preventDefault();
    setMsg(null);
    try {
      const body = {
        title, company: user.company?.name || user.name, location, type,
        tags: tags.split(",").map(s=>s.trim()).filter(Boolean),
        salary, description
      };
      const resp = await axiosClient.post("/jobs", body);
      setMsg({ok:true, text:"Job created"});
      // reset form
      setTitle(""); setLocation(""); setTags(""); setSalary(""); setDescription("");
      fetchJobs();
    } catch (err) {
      console.error(err);
      setMsg({ok:false, text: err?.message || "Failed"});
    }
  }

  return (
    <div className="container" style={{paddingTop:'1.25rem'}}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-3">Create job</h3>
          <form onSubmit={submit} className="space-y-3">
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job title" className="w-full border px-3 py-2 rounded" />
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-full border px-3 py-2 rounded" />
            <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full border px-3 py-2 rounded" />
            <input value={salary} onChange={e=>setSalary(e.target.value)} placeholder="Salary" className="w-full border px-3 py-2 rounded" />
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full border px-3 py-2 rounded">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border px-3 py-2 rounded" />
            <button className="px-4 py-2 bg-slate-900 text-white rounded">Create job</button>
          </form>
          {msg && <div className={`mt-3 ${msg.ok ? "text-green-600":"text-red-600"}`}>{msg.text}</div>}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Your jobs</h3>
          <div className="space-y-3">
            {loading && <div>Loading…</div>}
            {!loading && jobs.length===0 && <div className="text-slate-500">No jobs yet</div>}
            {jobs.map(j => (
              <div key={j._id ?? j.id} className="card p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{j.title}</div>
                    <div className="text-sm text-slate-600">{j.location} • {j.type}</div>
                  </div>
                  <div className="text-sm text-slate-500">{new Date(j.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="mt-2 text-sm">{(j.tags||[]).map(t=> <span key={t} className="tag mr-2">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
