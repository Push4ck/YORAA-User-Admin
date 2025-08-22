import React from "react";
import { ShoppingBag } from "lucide-react";
import ProductCard from "../product/ProductCard";

const BundlePreview = ({ main, items, onEdit, onDelete }) => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <ShoppingBag size={20} className="text-blue-600" />
        Bundle Preview
      </h3>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700">
              Main Product
            </span>
          </div>
          <ProductCard product={main} />
        </div>
        {items.map((item, i) => (
          <div key={item.sku || i} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">
                Bundle Item {i + 1}
              </span>
            </div>
            <ProductCard
              product={item}
              showActions={true}
              onEdit={() => onEdit(i)}
              onDelete={() => onDelete(i)}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BundlePreview;
