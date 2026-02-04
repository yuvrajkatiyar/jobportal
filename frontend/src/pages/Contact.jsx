// src/pages/Contact.jsx
import React from "react";

export default function Contact() {
  return (
    <main className="min-h-screen text-white bg-slate-900">
      <div className="container mx-auto px-6 py-5">
        <h1 className="text-5xl font-extrabold mb-6">Contact Us</h1>
        <p className="text-lg text-white/80 mb-12 max-w-2xl">
          Have questions or need help? Fill out the form below — we’ll get back
          to you.
        </p>

        <div className="bg-slate-800 rounded-xl shadow-xl p-6 md:p-10 text-black overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd4w3xEaS9NKSZv2zLbwTK3BukqRdqvVrd_sToZSiezIuO60A/viewform?embedded=true"
            width="100%"
            height="850"
            frameBorder="0"
            className="rounded-lg"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </main>
  );
}
