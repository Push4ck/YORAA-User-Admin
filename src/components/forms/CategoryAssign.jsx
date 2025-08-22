import React, { useState } from "react";
import { Layers } from "lucide-react";

const CategoryAssign = ({ onChange }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (onChange) onChange({ category: value, subCategory });
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSubCategory(value);
    if (onChange) onChange({ category, subCategory: value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
        <Layers className="w-5 h-5 text-pink-500" />
        Assign Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Category</option>
            <option value="clothing">Clothing</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Sub Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub Category
          </label>
          <select
            value={subCategory}
            onChange={handleSubCategoryChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Sub Category</option>
            {category === "clothing" && (
              <>
                <option value="tshirt">T-Shirts</option>
                <option value="jeans">Jeans</option>
                <option value="jackets">Jackets</option>
              </>
            )}
            {category === "footwear" && (
              <>
                <option value="sneakers">Sneakers</option>
                <option value="boots">Boots</option>
                <option value="sandals">Sandals</option>
              </>
            )}
            {category === "accessories" && (
              <>
                <option value="watches">Watches</option>
                <option value="belts">Belts</option>
                <option value="hats">Hats</option>
              </>
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryAssign;
