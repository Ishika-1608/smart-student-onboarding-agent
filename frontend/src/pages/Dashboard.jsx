import { useEffect, useState } from "react";
import API from "../services/api";

export default function StudentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [nextAction, setNextAction] = useState(null);

  // ---------- AUTH CHECK ----------
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    window.location.href = "/";
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "student") {
    window.location.href = "/";
  }

  // ---------- FETCH DATA ----------
  useEffect(() => {
    fetchTasks();
    fetchNextAction();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${user.admission_id}/`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextAction = async () => {
    try {
      const res = await API.get(
        `/next-action/${user.admission_id}/`
      );
      setNextAction(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------- LOGOUT ----------
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // ---------- PROGRESS ----------
  const completed =
    tasks.filter((t) => t.status === "COMPLETED").length;

  const progress =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Student Onboarding Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Progress */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">
          Onboarding Progress
        </h2>

        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-blue-500 h-3 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm mt-2">{progress}% completed</p>
      </div>

      {/* Next Action */}
      {nextAction && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-2">
            Recommended Next Action
          </h2>
          <p>{nextAction.message}</p>
        </div>
      )}

      {/* Checklist */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">
          Onboarding Checklist
        </h2>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between border-b py-2"
          >
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">
                Deadline: {task.deadline}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded ${
                task.status === "COMPLETED"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
