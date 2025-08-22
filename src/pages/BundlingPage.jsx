import { useState } from "react";
import { Plus, Package, X } from "lucide-react";
import Button from "../components/common/Button";
import ProductCard from "../components/product/ProductCard";
import ProductSelector from "../components/product/ProductSelector";
import BundlePreview from "../components/bundle/BundlePreview";
import { mockProduct } from "../constants/products";
import { STORAGE_KEYS } from "../constants/storage";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BundlingPage = () => {
  const [mainProduct, setMainProduct] = useLocalStorage(
    STORAGE_KEYS.BUNDLING.MAIN,
    mockProduct
  );
  const [bundleItems, setBundleItems] = useLocalStorage(
    STORAGE_KEYS.BUNDLING.ITEMS,
    [mockProduct]
  );
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
