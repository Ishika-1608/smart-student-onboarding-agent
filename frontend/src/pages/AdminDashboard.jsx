import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/admin-stats/")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Admin Onboarding Dashboard
        </h1>

        <a
          href="/"
          className="text-blue-600 underline font-medium"
        >
          ← Back to Login
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Students</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {stats.total_students}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Pending Tasks</p>
          <h2 className="text-3xl font-bold text-red-500">
            {stats.pending_tasks}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Completion Rate</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.completion_rate}%
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Bottleneck Task</p>
          <h2 className="text-lg font-bold text-yellow-600">
            {stats.bottleneck}
          </h2>
        </div>

      </div>

      {/* Overall Progress */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Overall Onboarding Progress
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${stats.completion_rate}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {stats.completion_rate}% onboarding completed
        </p>
      </div>

      {/* Activity Feed */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">
          Recent Activity
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>✅ Rahul completed Fee Payment</li>
          <li>✅ Pritul uploaded documents</li>
          <li>⚠ LMS activation pending for multiple students</li>
          <li>✅ Hostel allotment verified</li>
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;
