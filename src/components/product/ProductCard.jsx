import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ProductCard = ({ product, showActions = false, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover rounded-lg"
      />
      {showActions && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit();
            }}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            type="button"
          >
            <Pencil size={14} className="text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors"
            type="button"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      )}
    </div>
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
      <div className="space-y-1 text-sm text-gray-500">
        <p>
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p>
          <span className="font-medium">Sub:</span> {product.subCategory}
        </p>
        <p>
          <span className="font-medium">SKU:</span> {product.sku}
        </p>
      </div>
    </div>
  </div>
);

export default ProductCard;
