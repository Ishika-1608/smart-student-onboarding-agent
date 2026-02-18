import React from "react";

const getStatusColor = (status) => {
  if (status === "COMPLETED") return "bg-green-100 text-green-700";
  if (status === "UNDER_REVIEW") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Onboarding Checklist
      </h2>

      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-500">
              Deadline: {task.deadline}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
