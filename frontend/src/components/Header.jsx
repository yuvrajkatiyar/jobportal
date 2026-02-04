// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout, isCompany } = useAuth();

  return (
    <header className="bg-slate-900 text-white">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white font-bold">
              JP
            </div>
            <div className="text-lg font-bold tracking-wide">JOBPORTAL</div>
          </Link>

          {/* Primary nav (desktop) */}
          <nav className="hidden md:flex gap-6 ml-8 text-sm">
            <Link to="/" className="hover:text-indigo-300">Home</Link>
            <Link to="/jobs" className="hover:text-indigo-300">Jobs</Link>
            <Link to="/contact" className="hover:text-indigo-300">Contact</Link>
            <Link to="/about" className="hover:text-indigo-300">About</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="text-sm mr-2 text-slate-200">Hi, {user.name}</div>
              <button onClick={logout} className="px-3 py-1.5 bg-white/10 rounded text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-500">Login</Link>
              <Link to="/register" className="px-3 py-1.5 bg-white text-black rounded-full text-sm hover:bg-slate-50">Register</Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-slate-800" />
    </header>
  );
}
