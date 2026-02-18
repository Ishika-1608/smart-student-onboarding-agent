import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  // ---------- AUTH CHECK ----------
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/";
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "admin") {
    window.location.href = "/";
  }

  // ---------- FETCH DATA ----------
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin-stats/");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Total Students</h2>
          <p className="text-2xl font-bold">
            {stats.total_students}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">
            Completed Onboarding
          </h2>
          <p className="text-2xl font-bold">
            {stats.completed}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold">
            {stats.pending}
          </p>
        </div>
      </div>
    </div>
  );
}
