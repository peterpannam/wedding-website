'use client'; 

import { useState } from "react";
import { db, collection, addDoc } from './firebase';  // Adjust path based on file location


export default function Home() {
  const [rsvp, setRsvp] = useState({ name: "", email: "", attending: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRsvp({
      ...rsvp,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", rsvp);  // Add this log to check if it's triggered
    try {
      await addDoc(collection(db, "rsvps"), {
        name: rsvp.name,
        email: rsvp.email,
        attending: rsvp.attending,
        submittedAt: new Date().toISOString(),
      });
      alert("RSVP submitted!");
      setRsvp({ name: "", email: "", attending: false });
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Error submitting RSVP. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">RSVP</h1>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={rsvp.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={rsvp.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="attending"
            checked={rsvp.attending}
            onChange={handleChange}
          />
          Attending?
        </label>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
