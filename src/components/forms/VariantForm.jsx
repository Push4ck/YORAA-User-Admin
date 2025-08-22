import React, { useState } from "react";
import { FileText } from "lucide-react";
import ProductImages from "../product/ProductImages";
import StockSize from "../product/StockSize";
import MetaData from "./MetaData";

const VariantForm = ({ variantNumber, onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manufacturing: "",
    shipping: "",
    regularPrice: "",
    salePrice: "",
    images: [],
    stock: [],
    meta: { title: "", description: "", slug: "" },
  });

  const updateField = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onChange) onChange(variantNumber, updated);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-6">
        <FileText className="w-5 h-5 text-blue-500" />
        Variant {variantNumber}
      </h2>

      {/* Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200"
              placeholder="Title"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <textarea
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200"
            rows={3}
            placeholder="Description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <textarea
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200"
            rows={2}
            placeholder="Manufacturing details"
            value={formData.manufacturing}
            onChange={(e) => updateField("manufacturing", e.target.value)}
          />

          <textarea
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring focus:ring-blue-200"
            rows={2}
            placeholder="Shipping, returns and exchange"
            value={formData.shipping}
            onChange={(e) => updateField("shipping", e.target.value)}
          />

          <div className="flex gap-4">
            <input
              className="border border-gray-300 p-2 rounded-lg w-1/2 focus:ring focus:ring-blue-200"
              placeholder="Regular Price"
              type="number"
              value={formData.regularPrice}
              onChange={(e) => updateField("regularPrice", e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 rounded-lg w-1/2 focus:ring focus:ring-blue-200"
              placeholder="Sale Price"
              type="number"
              value={formData.salePrice}
              onChange={(e) => updateField("salePrice", e.target.value)}
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <ProductImages
          images={formData.images}
          onChange={(imgs) => updateField("images", imgs)}
        />
      </div>

      {/* Stock Size */}
      <StockSize onChange={(stock) => updateField("stock", stock)} />

      {/* Meta Data */}
      <MetaData
        data={formData.meta}
        onChange={(meta) => updateField("meta", meta)}
      />
    </div>
  );
};

export default VariantForm;
