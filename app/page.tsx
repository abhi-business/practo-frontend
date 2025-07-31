"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");

  const handleSearch = () => {
    if (speciality.trim()) {
      router.push(`/search?location=${location}&speciality=${speciality}`);
    }
  };

  return (
    <main className="min-h-screen bg-blue-900 text-white flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-6">Your home for health</h1>

      <div className="bg-white text-black rounded-lg p-6 shadow-md w-full max-w-xl flex flex-col gap-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location (e.g. JP Nagar)"
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="text"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          placeholder="Enter Speciality (e.g. Dermatologist)"
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </div>
    </main>
  );
}
