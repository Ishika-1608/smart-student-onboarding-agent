import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "student") {
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
        <h1 className="text-2xl font-bold">
          Student Onboarding Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-2">Onboarding Progress</h2>
        <div className="w-full bg-gray-200 h-3 rounded">
          <div className="bg-blue-500 h-3 w-1/3 rounded"></div>
        </div>
        <p className="text-sm mt-2">33% completed</p>
      </div>

      <div className="mt-6 bg-white p-4 shadow rounded">
        <h2 className="font-semibold mb-2">Onboarding Checklist</h2>
        <ul className="space-y-2">
          <li>📄 Upload Documents</li>
          <li>💰 Fee Payment</li>
          <li>🎓 LMS Activation</li>
        </ul>
      </div>
    </div>
  );
}
