// src/pages/Jobs.jsx
import React, { useState } from "react";
import useJobs from "../hooks/useJobs";
import JobCard from "../components/listing/JobCard";

export default function Jobs() {
  const [filters, setFilters] = useState({ q: "", location: "", type: "" });
  const { jobs } = useJobs(filters);

  return (
    <div className="container" style={{paddingTop: '1.25rem'}}>
      {/* search row */}
      <div className="card p-4 mb-6">
        <div className="search-row">
          <input
            placeholder="Search title, company or tag"
            value={filters.q}
            onChange={e=>setFilters(s=>({...s,q:e.target.value}))}
            className="search-input flex-1"
          />
          <input
            placeholder="Location"
            value={filters.location}
            onChange={e=>setFilters(s=>({...s,location:e.target.value}))}
            className="search-input w-56"
          />
          <select
            value={filters.type}
            onChange={e=>setFilters(s=>({...s,type:e.target.value}))}
            className="search-input w-44"
          >
            <option value="">Type (any)</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
      </div>

      {/* job grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    </div>
  );
}
