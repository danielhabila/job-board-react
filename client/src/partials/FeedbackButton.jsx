import React from "react";

function FeedbackButton() {
  return (
    <a
      href="mailto:dann.aviates@gmail.com"
      target="_blank"
      rel="noreferrer"
      type="button"
      className="fixed bottom-2 right-2 bg-[#26ae8f] hover:bg-[#26ae8f]/90 text-white font-bold py-1 px-3 rounded-xl"
    >
      Feedback
    </a>
  );
}

export default FeedbackButton;
