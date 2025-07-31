"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  experience: number;
  location: string;
  clinic: string;
  fees: number;
  rating: number;
  patientStories: number;
  availableToday: boolean;
};

export default function DoctorDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!doctor) return <p className="p-6">Doctor not found.</p>;

  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
      >
        ← Go Back
      </button>

      <div className="max-w-xl mx-auto border rounded-lg shadow p-6 text-black bg-blue-50">
        <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
        <p className="text-gray-700 mb-4">{doctor.speciality}</p>

        <p>
          <strong>Experience:</strong> {doctor.experience} years
        </p>
        <p>
          <strong>Location:</strong> {doctor.location}
        </p>
        <p>
          <strong>Clinic:</strong> {doctor.clinic}
        </p>
        <p>
          <strong>Fees:</strong> ₹{doctor.fees}
        </p>
        <p>
          <strong>Rating:</strong> {doctor.rating}%
        </p>
        <p>
          <strong>Patient Stories:</strong> {doctor.patientStories}
        </p>
        <p
          className={`font-semibold ${
            doctor.availableToday ? "text-green-600" : "text-red-600"
          }`}
        >
          {doctor.availableToday ? "Available Today" : "Not Available Today"}
        </p>
        <button
          className="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          onClick={() =>
            router.push(
              `/confirmation?name=${encodeURIComponent(
                doctor.name
              )}&clinic=${encodeURIComponent(doctor.clinic)}`
            )
          }
        >
          Book Appointment
        </button>
      </div>
    </main>
  );
}
