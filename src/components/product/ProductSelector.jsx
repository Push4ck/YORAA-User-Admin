import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import Select from "../common/Select";
import Button from "../common/Button";
import {
  productCategories,
  productSizes,
  productItems,
} from "../../constants/products";

const ProductSelector = ({ label, onAssign, initialProduct = null }) => {
  const [category, setCategory] = useState(initialProduct?.category || "");
  const [subCategory, setSubCategory] = useState(
    initialProduct?.subCategory || ""
  );
  const [item, setItem] = useState(initialProduct?.name || "");
  const [image, setImage] = useState(initialProduct?.image || "");
  const [quantity, setQuantity] = useState(initialProduct?.quantity ?? 1);
  const [price, setPrice] = useState(initialProduct?.price ?? 0);

  useEffect(() => {
    if (initialProduct) {
      setCategory(initialProduct.category || "");
      setSubCategory(initialProduct.subCategory || "");
      setItem(initialProduct.name || "");
      setImage(initialProduct.image || "");
      setQuantity(initialProduct.quantity ?? 1);
      setPrice(initialProduct.price ?? 0);
    }
  }, [initialProduct]);

  const handleAssign = () => {
    const isEditing = Boolean(initialProduct && initialProduct.sku);
    const skuBase =
      category || subCategory || item
        ? `${(category || "cat").replace(/\s+/g, "-")}-${(
            subCategory || "sub"
          ).replace(/\s+/g, "-")}-${(item || "item").replace(/\s+/g, "-")}`
        : `prod-${Date.now()}`;

    const newProduct = {
      name: item || "Unnamed",
      category: category || "Uncategorized",
      subCategory: subCategory || "Unknown",
      quantity: Number(quantity) || 1,
      price: Number(price) || 0,
      image: image || "https://via.placeholder.com/150",
      sku: isEditing ? initialProduct.sku : `${skuBase}-${Date.now()}`,
    };

    onAssign(newProduct);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Select
            placeholder="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={productCategories}
          />
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sub Category
          </label>
          <Select
            placeholder="Select Sub Category"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            options={productSizes}
          />
        </div>

        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item
          </label>
          <Select
            placeholder="Select Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            options={productItems}
          />
        </div>

        <div className="min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qty
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
            min="1"
          />
        </div>

        <div className="min-w-[140px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
            min="0"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
            placeholder="https://..."
          />
        </div>

        {label && (
          <Button onClick={handleAssign} className="shrink-0">
            <Package size={16} />
            {label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductSelector;
