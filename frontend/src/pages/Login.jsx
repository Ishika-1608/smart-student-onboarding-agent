import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [admissionId, setAdmissionId] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const handleLogin = () => {

    // ---------- STUDENT LOGIN ----------
    if (role === "student") {

      if (!name || !admissionId) {
        alert("Enter details");
        return;
      }

      localStorage.setItem("role", "student");
      localStorage.setItem("studentId", admissionId);
      localStorage.setItem("studentName", name);

      navigate("/student");
    }

    // ---------- ADMIN LOGIN ----------
    else {

      // Demo admin login (for hackathon)
      if (adminUser === "ishika" && adminPass === "ishika123") {

        localStorage.setItem("role", "admin");
        navigate("/admin");

      } else {
        alert("Invalid admin credentials");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Smart Onboarding Agent
        </h2>

        {/* Role Switch */}
        <div className="flex mb-4">
          <button
            className={`w-1/2 p-2 ${role === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            className={`w-1/2 p-2 ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* STUDENT FORM */}
        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full p-2 border mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Admission ID"
              className="w-full p-2 border mb-3"
              value={admissionId}
              onChange={(e) => setAdmissionId(e.target.value)}
            />
          </>
        )}

        {/* ADMIN FORM */}
        {role === "admin" && (
          <>
            <input
              type="text"
              placeholder="Admin Username"
              className="w-full p-2 border mb-3"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border mb-3"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
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
}
