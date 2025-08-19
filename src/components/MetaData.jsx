import React, { useState } from "react";
import { Globe } from "lucide-react";

const MetaData = ({ onChange }) => {
  const [meta, setMeta] = useState({
    title: "",
    description: "",
    slug: "",
  });

  const handleChange = (field, value) => {
    const updated = { ...meta, [field]: value };
    setMeta(updated);
    if (onChange) onChange(updated); // send data to parent
  };

  return (
    <div className="mt-8">
      <h3 className="flex items-center gap-2 font-medium text-gray-700 mb-3">
        <Globe className="w-5 h-5 text-purple-500" />
        Meta Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-200"
          placeholder="Meta Title"
          value={meta.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-200"
          placeholder="Meta Description"
          value={meta.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <input
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-purple-200"
          placeholder="Slug URL"
          value={meta.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
        />
      </div>
    </div>
  );
};

export default MetaData;
