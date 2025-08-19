import React, { useState } from "react";
import { Boxes, Plus, Trash2 } from "lucide-react";

const StockSize = ({ onChange }) => {
  const [stocks, setStocks] = useState([{ size: "", quantity: "", sku: "" }]);

  const handleChange = (index, field, value) => {
    const updated = stocks.map((stock, i) =>
      i === index ? { ...stock, [field]: value } : stock
    );
    setStocks(updated);
    if (onChange) onChange(updated);
  };

  const addRow = () => {
    setStocks([...stocks, { size: "", quantity: "", sku: "" }]);
  };

  const removeRow = (index) => {
    const updated = stocks.filter((_, i) => i !== index);
    setStocks(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 font-medium text-gray-700 mb-3">
        <Boxes className="w-5 h-5 text-green-500" />
        Stock Size
      </h3>

      <div className="space-y-3">
        {stocks.map((stock, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              className="border border-gray-300 p-2 rounded-lg w-1/3 focus:ring focus:ring-green-200"
              placeholder="Size"
              value={stock.size}
              onChange={(e) => handleChange(index, "size", e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 rounded-lg w-1/3 focus:ring focus:ring-green-200"
              placeholder="Quantity"
              type="number"
              value={stock.quantity}
              onChange={(e) => handleChange(index, "quantity", e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 rounded-lg w-1/3 focus:ring focus:ring-green-200"
              placeholder="SKU"
              value={stock.sku}
              onChange={(e) => handleChange(index, "sku", e.target.value)}
            />
            {stocks.length > 1 && (
              <button
                onClick={() => removeRow(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Row Button */}
      <button
        onClick={addRow}
        className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
      >
        <Plus className="w-4 h-4" />
        Add Size
      </button>
    </div>
  );
};

export default StockSize;
