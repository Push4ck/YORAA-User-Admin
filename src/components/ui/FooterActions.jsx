import React from "react";

const FooterActions = ({ onSaveDraft, onPublish, onProceed }) => {
  return (
    <div className="flex justify-end gap-4 mt-10">
      <button
        onClick={onSaveDraft}
        type="button"
        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg border hover:bg-gray-200 transition"
      >
        Save as Draft
      </button>

      <button
        onClick={onPublish}
        type="button"
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Publish Product
      </button>

      <button
        onClick={onProceed}
        type="button"
        className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
      >
        Proceed Details
      </button>
    </div>
  );
};

export default FooterActions;
