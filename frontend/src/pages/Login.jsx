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
    if (role === "student") {
      if (!name || !admissionId) {
        alert("Please fill all fields");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          role: "student",
          name: name,
          admissionId: admissionId,
        })
      );

      navigate("/student");
    } else {
      // Admin login (demo credentials)
      if (adminUser === "admin" && adminPass === "onboard@2026") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            role: "admin",
            username: adminUser,
          })
        );

        navigate("/admin");
      } else {
        alert("Invalid admin credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Smart Onboarding Agent
        </h2>

        {/* Role Switch */}
        <div className="flex mb-6">
          <button
            className={`w-1/2 p-2 ${
              role === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("student")}
          >
            Student
          </button>

          <button
            className={`w-1/2 p-2 ${
              role === "admin"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Student Login */}
        {role === "student" && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Admission ID"
              value={admissionId}
              onChange={(e) => setAdmissionId(e.target.value)}
            />
          </>
        )}

        {/* Admin Login */}
        {role === "admin" && (
          <>
            <input
              className="w-full border p-2 mb-3 rounded"
              placeholder="Admin Username"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-2 mb-4 rounded"
              placeholder="Admin Password"
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
