import React, { useState } from "react";

const TestingChatGpt = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-medium mb-4">Choose Your Plan</h1>
      <div className="w-full max-w-sm">
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-medium mb-2">Basic</h2>
          <p className="text-sm mb-2">$499 per job post</p>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg ${
              selectedPlan === "basic" ? "bg-indigo-500" : ""
            }`}
            onClick={() => handleSelectPlan("basic")}
          >
            Select
          </button>
        </div>
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-medium mb-2">Premium</h2>
          <p className="text-sm mb-2">$799 per job post</p>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg ${
              selectedPlan === "premium" ? "bg-indigo-500" : ""
            }`}
            onClick={() => handleSelectPlan("premium")}
          >
            Select
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-medium mb-2">Enterprise</h2>
          <p className="text-sm mb-2">Custom pricing, please contact us</p>
          <button
            className={`bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg ${
              selectedPlan === "enterprise" ? "bg-indigo-500" : ""
            }`}
            onClick={() => handleSelectPlan("enterprise")}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestingChatGpt;
