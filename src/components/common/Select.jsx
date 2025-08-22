import React from "react";

const Select = ({
  options = [],
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
}) => (
  <select
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`border border-gray-200 px-4 py-3 rounded-lg bg-white text-gray-700 
      shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:border-transparent transition-all hover:border-gray-300 
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    <option value="">{placeholder}</option>
    {options.map((opt, idx) => (
      <option key={opt.value || idx} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
