import React from "react";

const ProgressBar = ({ tasks }) => {
  if (!tasks.length) return null;

  const completed = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const progress = Math.round(
    (completed / tasks.length) * 100
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-3">
        Onboarding Progress
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {progress}% completed
      </p>
    </div>
  );
};

export default ProgressBar;
