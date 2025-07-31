"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const clinic = searchParams.get("clinic");
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-6 rounded-md shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Appointment Confirmed!
        </h1>
        <p className="text-lg font-semibold mb-2 text-black">With Dr. {name}</p>
        <p className="text-gray-700 mb-4">at {clinic}</p>
        <p className="text-sm text-gray-500 mb-6">
          You will receive a confirmation shortly.
        </p>

        {/* Go to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
