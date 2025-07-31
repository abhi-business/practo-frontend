"use client";

import { useSearchParams } from "next/navigation";
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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const speciality = searchParams.get("speciality") || "";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/doctors", {
          params: { location, speciality },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [location, speciality]);

  return (
    <main className="min-h-screen bg-blue-100 px-6 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">
        {
          doctors.filter((doc) => !showAvailableOnly || doc.availableToday)
            .length
        }{" "}
        {speciality}s available in {location}
      </h1>

      {/* Filter checkbox */}
      <div className="mb-4 flex justify-center">
        <label className="inline-flex items-center text-black">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly(!showAvailableOnly)}
            className="mr-2"
          />
          Show only doctors available today
        </label>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center">No doctors found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors
            .filter((doc) => !showAvailableOnly || doc.availableToday)
            .map((doc) => (
              <div
                key={doc.id}
                onClick={() => (window.location.href = `/doctor/${doc.id}`)}
                className="cursor-pointer border rounded-lg ... hover:shadow-lg transition text-black"
              >
                <h2 className="text-xl font-semibold">{doc.name}</h2>
                <p className="text-sm text-black-600">{doc.speciality}</p>

                <p className="mt-2">
                  <strong>Experience:</strong> {doc.experience} years
                </p>
                <p>
                  <strong>Clinic:</strong> {doc.clinic}
                </p>
                <p>
                  <strong>Fees:</strong> ₹{doc.fees}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      doc.rating >= 95
                        ? "text-green-600"
                        : doc.rating >= 85
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    👍 {doc.rating}%
                  </span>
                </p>
                <p>
                  <strong>Patient Stories:</strong> {doc.patientStories}
                </p>
                <p
                  className={`${
                    doc.availableToday ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {doc.availableToday
                    ? "Available Today"
                    : "Not Available Today"}
                </p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                  Book Clinic Visit
                </button>
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
