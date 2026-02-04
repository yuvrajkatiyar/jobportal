// src/components/listing/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  const jobId = job._id ?? job.id;
  return (
    <article className="card job-card p-5">
      <div className="flex justify-between items-start gap-4">
        <div>
          <Link to={`/jobs/${jobId}`} className="block">
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
          </Link>
          <div className="text-sm text-slate-300">{job.company} • {job.location}</div>
        </div>
        <div className="text-sm text-right">
          <div className="text-sm text-slate-500">{job.salary || ''}</div>
          {/* <div className="text-xs text-slate-400">{job.postedAt}</div> */}
        </div>
      </div>

      <div className="mt-4 flex gap-2 flex-wrap">
        {(job.tags || []).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </article>
  );
}
