import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-3">Admin Overview</h2>

        <p>👨‍🎓 Total Students: 24</p>
        <p>✅ Completed Onboarding: 10</p>
        <p>⏳ Pending Tasks: 14</p>
      </div>
    </div>
  );
}
