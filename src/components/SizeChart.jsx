import React from "react";
import { Ruler } from "lucide-react";

const SizeChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
        <Ruler className="w-5 h-5 text-indigo-500" />
        Size Chart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center border-2 border-dashed rounded-xl p-6 hover:border-indigo-400 transition">
          <p className="text-sm text-gray-600">Size Chart (inch)</p>
          <input type="file" className="mt-2 text-sm" />
        </div>
        <div className="text-center border-2 border-dashed rounded-xl p-6 hover:border-indigo-400 transition">
          <p className="text-sm text-gray-600">Size Chart (cm)</p>
          <input type="file" className="mt-2 text-sm" />
        </div>
        <div className="text-center border-2 border-dashed rounded-xl p-6 hover:border-indigo-400 transition">
          <p className="text-sm text-gray-600">Size Measurement Image</p>
          <input type="file" className="mt-2 text-sm" />
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
