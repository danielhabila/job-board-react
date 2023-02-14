import React, { useState, useEffect } from "react";
import axios from "axios";

function Pricing() {
  const [stick, setStick] = useState(false);
  const [stickOneWeek, setStickOneWeek] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [totalCost, setTotalCost] = useState(499);

  const handleAddOnSelection = (addOn) => {
    if (selectedAddOns.includes(addOn)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== addOn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const checkout = async (event) => {
    try {
      event.preventDefault();
      console.log(totalCost);
      const response = await axios.post("http://localhost:4000/checkout", {
        totalCost,
        quantity: 1,
      });
      if (response.data.url) {
        window.location.assign(response.data.url); // Forwarding user to Stripe
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let addOnCost = 0;
    selectedAddOns.forEach((addOn) => {
      if (addOn === "24 hour stick") {
        addOnCost += 99;
      } else if (addOn === "1 week stick") {
        addOnCost += 199;
      } else if (addOn === "highlight") {
        addOnCost += 49;
      }
    });
    setTotalCost(499 + addOnCost);
  }, [selectedAddOns]);

  return (
    <div className="py-6">
      <div className="text-lg font-bold text-gray-800 mb-5">
        <span className="text-myred">3.</span> Select add-ons and pay
      </div>
      <div className="space-y-4">
        {/* Add-on button #1 *****************************************************/}
        <button
          className={`w-full text-left py-3 px-4 border rounded ${
            stick
              ? "border-green-300 ring-2 ring-green-300"
              : " border-red-200 ring-1 ring-red-200"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setStick(!stick);
            handleAddOnSelection("24 hour stick");
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-800 font-medium mb-1">
                Stick your post to stay on top for 24 hours (+$99)
              </div>
              <div className="text-sm text-gray-500 italic">4x more views</div>
            </div>
            <div className="shrink-0 rounded-full border border-gray-200 ml-3">
              {stick ? (
                <svg
                  x-show="checked"
                  className="fill-teal-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                </svg>
              ) : (
                <svg
                  className="fill-indigo-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                </svg>
              )}
            </div>
          </div>
        </button>
        {/* Add-on button #2 *****************************************************/}
        <button
          className={`w-full text-left py-3 px-4 border rounded ${
            stickOneWeek
              ? "border-green-300 ring-2 ring-green-300"
              : " border-red-200 ring-1 ring-red-200"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setStickOneWeek(!stickOneWeek);
            handleAddOnSelection("1 week stick");
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-800 font-medium mb-1">
                Stick your post to stay on top for 1 week (+$299)
              </div>
              <div className="text-sm text-gray-500 italic">4x more views</div>
            </div>
            <div className="shrink-0 rounded-full border border-gray-200 ml-3">
              {stickOneWeek ? (
                <svg
                  x-show="checked"
                  className="fill-teal-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                </svg>
              ) : (
                <svg
                  className="fill-indigo-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                </svg>
              )}
            </div>
          </div>
        </button>
        {/* Add-on button #3 *****************************************************/}
        <button
          className={`w-full text-left py-3 px-4 border rounded ${
            highlight
              ? "border-green-300 ring-2 ring-green-300"
              : "border-red-200 ring-1 ring-red-200"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setHighlight(!highlight);
            handleAddOnSelection("highlight");
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-800 font-medium mb-1">
                Highlight your post in yellow (+$49)
              </div>
              <div className="text-sm text-gray-500 italic">2x more views</div>
            </div>
            <div className="shrink-0 rounded-full border border-gray-200 ml-3">
              {highlight ? (
                <svg
                  x-show="checked"
                  className="fill-teal-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m20.28 12.28-6.292 6.294-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414Z" />
                </svg>
              ) : (
                <svg
                  className="fill-indigo-500"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15h-4v-4a1 1 0 0 0-2 0v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2Z" />
                </svg>
              )}
            </div>
          </div>
        </button>
        {/* END OF button #3 *****************************************************/}
      </div>
      <div className="mt-6">
        <button
          className="btn w-full text-white bg-myred hover:bg-red-600 shadow-sm"
          // type="submit"
          onClick={checkout}
        >
          Pay Now - ${totalCost}
        </button>
      </div>
    </div>
  );
}

export default Pricing;
