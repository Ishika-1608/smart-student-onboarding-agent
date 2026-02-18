import React from "react";

const NextActionCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">
        🤖 Recommended Next Action
      </h2>

      <p className="text-gray-700 mb-3">{data.message}</p>

      <div className="text-sm text-gray-500">
        <p><b>Task:</b> {data.task}</p>
        <p><b>Deadline:</b> {data.deadline}</p>
        <p><b>Days Left:</b> {data.days_left}</p>
      </div>
    </div>
  );
};

export default NextActionCard;
