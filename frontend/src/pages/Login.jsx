import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [admissionId, setAdmissionId] = useState("");

  const handleLogin = async () => {
    // Admin login (no DB required for hackathon)
    if (role === "admin") {
      window.location.href = "/admin";
      return;
    }

    // Student login
    const res = await axios.post(
      "/login/",
      {
        name: name,
        admission_id: admissionId,
      }
    );

    localStorage.setItem(
      "student",
      JSON.stringify(res.data)
    );

    window.location.href = "/student";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">
          Smart Onboarding Agent
        </h2>

        {/* Role Selection */}
        <div className="flex mb-4">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 p-2 ${
              role === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`flex-1 p-2 ${
              role === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Student Fields */}
        {role === "student" && (
          <>
            <input
              className="w-full border p-2 mb-3"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-4"
              placeholder="Admission ID"
              onChange={(e) => setAdmissionId(e.target.value)}
            />
          </>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Continue
        </button>
      </div>

    </div>
  );
};

export default Login;
