import React, { useEffect, useState } from "react";
import { getNextAction, getTasks } from "../services/api";
import ProgressBar from "../components/ProgressBar";
import NextActionCard from "../components/NextActionCard";
import TaskList from "../components/TaskList";
import ChatAssistant from "../components/ChatAssistant";

const Dashboard = () => {
  const [nextAction, setNextAction] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Demo student ID
  const student = JSON.parse(localStorage.getItem("student"));
  if (!student) {
  window.location.href = "/";
}
  const admissionId = student?.admission_id;

  useEffect(() => {
    getNextAction(admissionId)
      .then((res) => setNextAction(res.data))
      .catch((err) => console.log(err));

    getTasks(admissionId)
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Smart Student Onboarding Agent
          </h1>
          <p className="text-gray-500">
            Welcome, 👋 Here’s your onboarding progress and next steps.
          </p>
        </div>

        {/* Switch to Admin */}
        <a
          href="/admin"
          onClick={() => localStorage.removeItem("student")}
          className="text-blue-600 underline font-medium"
        >
          Admin View →
        </a>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">

          {/* Progress */}
          <ProgressBar tasks={tasks} />

          {/* AI Recommended Action */}
          <NextActionCard data={nextAction} />

          {/* Checklist */}
          <TaskList tasks={tasks} />

        </div>

        {/* RIGHT SIDE - AI Assistant */}
        <div className="bg-white shadow-lg rounded-2xl p-4 h-[600px]">
          <ChatAssistant />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
