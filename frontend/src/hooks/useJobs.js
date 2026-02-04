// src/hooks/useJobs.js
import { useState, useEffect, useCallback } from "react";
import axiosClient from "../api/axiosCLient";

export default function useJobs({ q = "", location = "", type = "" } = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (q) params.q = q;
      if (location) params.location = location;
      if (type) params.type = type;
      const resp = await axiosClient.get("/jobs", { params });
      // server returns { jobs, total, ... } — adapt if different
      setJobs(resp.data.jobs ?? resp.data);
    } catch (e) {
      setError(e);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [q, location, type]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
}
