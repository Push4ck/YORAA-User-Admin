import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center gap-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    secondary:
      "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg",
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${
        sizes[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
