import { useState } from "react";
import { Pencil, Trash2, X, Plus, Package, ShoppingBag } from "lucide-react";

// Mock data
const mockProduct = {
  name: "T shirt",
  category: "T shirt",
  subCategory: "small",
  size: "small",
  quantity: 5,
  price: 4566,
  salePrice: 4566,
  sku: "blk/m/ins0123",
  barcode: "4560000000000",
  image: "https://via.placeholder.com/150",
};

// Reusable Button
const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
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
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Reusable Select
const Select = ({ options = [], placeholder, value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="border border-gray-200 px-4 py-3 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
  >
    <option value="">{placeholder}</option>
    {options.map((opt, idx) => (
      <option key={idx} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// Product Selector
const ProductSelector = ({ label, onAssign }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState("");

  const handleAssign = () => {
    const newProduct = {
      ...mockProduct,
      name: item || "Unnamed",
      category: category || "Uncategorized",
      subCategory: subCategory || "Unknown",
      sku: `${category}-${subCategory}-${item}`,
    };
    onAssign(newProduct);
  };

  return (
    <div className="p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <Select
            placeholder="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { label: "T shirt", value: "T shirt" },
              { label: "Jeans", value: "Jeans" },
            ]}
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
            options={[
              { label: "Small", value: "Small" },
              { label: "Medium", value: "Medium" },
            ]}
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
            options={[
              { label: "Basic Tee", value: "Basic Tee" },
              { label: "Premium Tee", value: "Premium Tee" },
            ]}
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

// Product Card
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
            onClick={onEdit}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          >
            <Pencil size={14} className="text-gray-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-lg shadow-lg hover:bg-red-50 transition-colors"
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

// Bundle Preview
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
          <div key={i} className="space-y-3">
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

const BundlingPage = () => {
  const [mainProduct, setMainProduct] = useState(mockProduct);
  const [bundleItems, setBundleItems] = useState([mockProduct]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddBundleItem = () => {
    setBundleItems((prev) => [...prev, mockProduct]);
  };

  const handleDeleteBundleItem = (index) => {
    setBundleItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleEditBundleItem = (index) => {
    setEditingIndex(index);
  };

  const handleUpdateBundleItem = (updatedProduct) => {
    setBundleItems((prev) =>
      prev.map((item, idx) => (idx === editingIndex ? updatedProduct : item))
    );
    setEditingIndex(null);
  };

  const handleSaveBundle = () => {
    console.log("Saving bundle:", {
      mainProduct,
      bundleItems,
    });
  };

  return (
    <div className="max-w-7xl px-6 py-8 space-y-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product Bundling Manager
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Create and manage product bundles with an intuitive interface
        </p>
      </div>

      {/* Main Product Section */}
      <div className="rounded-2xl p-8 shadow-md space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Select Main Product
          </h2>
        </div>

        <ProductSelector
          label="Assign Main Product"
          onAssign={setMainProduct}
        />

        <div className="flex flex-wrap items-start gap-6">
          <div className="w-64">
            <ProductCard product={mainProduct} />
          </div>
          <div className="flex-1 min-w-48">
            <Button onClick={handleAddBundleItem} variant="secondary" size="lg">
              <Plus size={18} />
              Add Bundle Item
            </Button>
          </div>
        </div>
      </div>

      {/* Bundle Items Section */}
      {bundleItems.length > 0 && (
        <div className="rounded-2xl p-8 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Bundle Items
            </h2>
          </div>

          <div className="grid gap-6">
            {bundleItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-800">
                    Bundle Item {index + 1}
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <ProductSelector
                    label="Update Item"
                    onAssign={(newProduct) =>
                      setBundleItems((prev) =>
                        prev.map((it, idx) => (idx === index ? newProduct : it))
                      )
                    }
                  />
                  <div className="w-64">
                    <ProductCard product={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bundle Preview Section */}
      <div className="rounded-2xl p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Bundle Preview
          </h2>
        </div>

        <BundlePreview
          main={mainProduct}
          items={bundleItems}
          onEdit={handleEditBundleItem}
          onDelete={handleDeleteBundleItem}
        />

        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveBundle} size="lg">
            <Package size={18} />
            Save Bundle
          </Button>
        </div>
      </div>

      {/* Editing Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Bundle Item {editingIndex + 1}
              </h2>
              <button
                onClick={() => setEditingIndex(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <ProductSelector
                label="Update Item"
                onAssign={handleUpdateBundleItem}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BundlingPage;
