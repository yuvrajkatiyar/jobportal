// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosCLient"; // optional: to fetch featured jobs
// logos taken from public/assets/logos/*

const companies = [
  "adobe.png","Airbnb.png","amazon.png","apple.png","cisco.png","dropbox.png",
  "google.png","linkedin.png","meta.png","microsoft.png",
  "netflix.png","oracle.png","salesforce.png","paypal.png"
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Try to load real featured jobs, fallback to static sample if API not ready
    (async () => {
      try {
        const resp = await axiosClient.get("/jobs?limit=6");
        const jobs = resp.data.jobs ?? resp.data;
        setFeatured(jobs.slice(0,6));
      } catch (err) {
        setFeatured([
          { _id: "1", title: "Frontend Engineer", company: "Nimbus Labs", location: "Bengaluru", tags: ["React","Tailwind"] },
          { _id: "2", title: "Backend Engineer", company: "Atlas Data", location: "Remote", tags: ["Node.js","MongoDB"] },
          { _id: "3", title: "Full Stack Developer", company: "TechNova", location: "Delhi", tags: ["React","Node"] }
        ]);
      }
    })();
  }, []);

  // auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % Math.max(1, Math.ceil(featured.length / 2)));
    }, 3000);
    return () => clearInterval(t);
  }, [featured.length]);

  // chunk 2-per-slide
  const slides = [];
  for (let i = 0; i < featured.length; i += 2) slides.push(featured.slice(i, i+2));

  return (
    <main className="bg-slate-900 text-white min-h-screen pb-16">
      {/* Hero */}
      <section className="container flex flex-col lg:flex-row items-center justify-center text-center gap-8 py-20">

        <div className="flex-1">
          <h1 className="text-8xl font-extrabold leading-tight">JOBPORTAL</h1>
          <p className="mt-4 text-lg text-slate-300">
            Your <span className="text-amber-400 font-semibold">gateway</span> to job opportunities.
          </p>

          <div className="flex justify-center items-center gap-4 mt-6">
            <Link to="/jobs" className="px-6 py-3 bg-indigo-600 rounded flex justify-center text-white font-semibold hover:bg-indigo-500">Browse Jobs</Link>
            <Link to="/company/register" className="px-6 py-3 bg-white text-black rounded font-medium hover:bg-slate-100">Hire Talent</Link>
          </div>
        </div>

      </section>

      {/* Featured Jobs carousel */}
      <section className="container mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Featured Jobs</h2>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(slides[index] || []).map(job => (
              <div key={job._id ?? job.id} className="card p-6 bg-white text-white-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="text-sm text-slate-300">{job.company} • {job.location}</div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {(job.tags || []).map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700  rounded-full border border-slate-300 text-xs">{t}</span>)}
                    </div>
                  </div>
                  <Link to={`/jobs/${job._id ?? job.id}`} className="ml-4 text-indigo-600">View</Link>
                </div>
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="flex items-center justify-center mt-6 gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${i === index ? "bg-indigo-500" : "bg-white/60"}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="container mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-white">Companies on our site</h2>
        <div className="bg-slate-800 p-6 rounded">
          <div className="flex gap-4 items-center overflow-x-auto py-4">
            {companies.map((c, idx) => (
              <div key={idx} className="flex-none w-16 h-16 p-2 bg-white/5 rounded flex items-center justify-center">
                <img src={`/assets/logos/${c}`} alt={c} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
