import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [admissionId, setAdmissionId] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    if (!name || !admissionId) {
      alert("Please enter all details");
      return;
    }

    // Store user locally
    const userData = {
      name: name,
      admission_id: admissionId,
      role: role,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect based on role
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/student";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[380px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Smart Onboarding Agent
        </h1>

        {/* Role Toggle */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${
              role === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            className={`flex-1 py-2 ${
              role === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Admission ID */}
        <input
          type="text"
          placeholder="Admission ID"
          className="w-full border p-2 rounded mb-4"
          value={admissionId}
          onChange={(e) => setAdmissionId(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
