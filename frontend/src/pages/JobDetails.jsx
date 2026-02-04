// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosCLient";
import mockJobs from "../data/mockJobs.json";

export default function JobDetails() {
  const { id } = useParams();           // id from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      setLoading(true);
      setJob(null);

      // 1) Try backend first (if axiosClient configured)
      try {
        const resp = await axiosClient.get(`/jobs/${id}`);
        // backend might return job directly, or wrapped as { job } or { data: job }
        const serverJob = resp.data && (resp.data.job ?? resp.data);
        if (serverJob && mounted) {
          setJob(serverJob);
          setLoading(false);
          return;
        }
      } catch (err) {
        // ignore — fallback to local mock
        // console.warn("Backend job fetch failed, falling back to mock:", err);
      }

      // 2) fallback: find in mockJobs by id or _id
      const found = mockJobs.find(j => (j._id ?? j.id) === id);
      if (found && mounted) {
        setJob(found);
      }
      if (mounted) setLoading(false);
    };

    fetch();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!job) return <div className="p-6">Job not found.</div>;

  const jobId = job._id ?? job.id;

  return (
  <div className="container" style={{ paddingTop: "1.25rem" }}>
    <div className="card p-6">
      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
      <div className="text-slate-300 mb-4">{job.company} • {job.location}</div>
    
    {/* Job Tags Section */}
      {job.tags && job.tags.length > 0 && (
        <div className="mt-6">
          <p className="text-xl font-bold mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full border border-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Job Description */}
      <p className="text-xl font-bold mb-2">Job Description:</p>
      <p className="mt-4 text-slate-300 leading-relaxed">{job.description}</p>

      

      {/* Apply Button */}
      <div className="mt-6 flex gap-3">
        <Link
          to={`/apply/${jobId}`}
          className="px-4 py-2 bg-slate-900 text-white rounded"
        >
          Apply
        </Link>
      </div>
    </div>
  </div>
);

}
