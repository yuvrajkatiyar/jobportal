import React from "react";

export default function About() {
  return (
    <main className="min-h-screen text-white bg-slate-900">
      <div className="container mx-auto px-6 py-5">
        {/* Header Section - Matches Contact Page Typography */}
        <h1 className="text-5xl font-extrabold mb-6">About Us</h1>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl">
          We are bridging the gap between talent and opportunity. Learn more about our mission and the team behind the platform.
        </p>

        {/* Content Section - Matches the "White Card" style of your Contact Form */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-6 md:p-10 text-white">
          
          <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Founded with a vision to simplify the job search process, our platform connects aspiring professionals with top-tier companies. We believe that finding a job shouldn't be a full-time job.
          </p>

          <h2 className="text-3xl font-bold mb-4 text-white-900">What We Do</h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            We provide a seamless interface for recruiters to post jobs and for candidates to apply with ease. Our focus is on transparency, speed, and user experience.
          </p>

          {/* Optional: Simple Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 border-t pt-8">
            <div>
              <h3 className="text-4xl font-extrabold text-blue-600">5K+</h3>
              <p className="text-gray-300">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-blue-600">10K+</h3>
              <p className="text-gray-300">Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-blue-600">50K+</h3>
              <p className="text-gray-300">Candidates</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}