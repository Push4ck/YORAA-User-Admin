import { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Upload,
  Eye,
  Save,
  X,
  AlertCircle,
  Search,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

// Enhanced Button Component
const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  size = "md",
}) => {
  const baseClasses =
    "font-medium transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md disabled:bg-gray-400 disabled:hover:bg-gray-400",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm hover:shadow-md",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${
        variants[variant]
      } ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

// Enhanced SearchBar Component
const SearchBar = ({ placeholder, value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
    />
  </div>
);

// Enhanced Dropdown Component
const Dropdown = ({ options, value, onChange, placeholder, icon }) => (
  <div className="relative">
    {icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    )}
    <select
      value={value}
      onChange={onChange}
      className={`w-full ${
        icon ? "pl-10" : "pl-3"
      } pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors appearance-none cursor-pointer`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Enhanced Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-150 overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Enhanced Product Form Component
const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    subCategories: product?.subCategories || "",
    hsn: product?.hsn || "",
    sku: product?.sku || "",
    barcode: product?.barcode || "",
    status: product?.status || "draft",
    sizes: product?.sizes || [
      { size: "small", quantity: 0, price: "", salePrice: "", aiPrice: "" },
    ],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [
        ...prev.sizes,
        { size: "", quantity: 0, price: "", salePrice: "", aiPrice: "" },
      ],
    }));
  };

  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      const newSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, sizes: newSizes }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, ...formData, id: product?.id || Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Category *
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter category"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Sub Category
          </label>
          <input
            type="text"
            value={formData.subCategories}
            onChange={(e) => handleInputChange("subCategories", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter sub category"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            HSN Code
          </label>
          <input
            type="text"
            value={formData.hsn}
            onChange={(e) => handleInputChange("hsn", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter HSN code"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            SKU
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter SKU"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Barcode
          </label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => handleInputChange("barcode", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter barcode"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="draft">Draft</option>
          <option value="live">Live</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-semibold text-gray-700">
            Sizes & Variants
          </label>
          <Button type="button" onClick={addSize} size="sm" variant="secondary">
            <Plus className="w-4 h-4 mr-1" />
            Add Size
          </Button>
        </div>

        <div className="space-y-4">
          {formData.sizes.map((size, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50"
            >
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Size
                  </label>
                  <input
                    type="text"
                    value={size.size}
                    onChange={(e) =>
                      handleSizeChange(index, "size", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="S, M, L..."
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={size.quantity}
                    onChange={(e) =>
                      handleSizeChange(
                        index,
                        "quantity",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Price
                  </label>
                  <input
                    type="number"
                    value={size.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    value={size.salePrice}
                    onChange={(e) =>
                      handleSizeChange(index, "salePrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    AI Price
                  </label>
                  <input
                    type="number"
                    value={size.aiPrice}
                    onChange={(e) =>
                      handleSizeChange(index, "aiPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="flex justify-center">
                  {formData.sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Save Product
        </Button>
      </div>
    </form>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color = "blue", trend }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`text-sm flex items-center ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
};

// Main Component
const ManageItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Premium Cotton T-Shirt",
      category: "Clothing",
      subCategories: "T-Shirts",
      hsn: "6109",
      sizes: [
        {
          size: "Small",
          quantity: 15,
          price: "599",
          salePrice: "479",
          aiPrice: "539",
        },
        {
          size: "Medium",
          quantity: 25,
          price: "599",
          salePrice: "479",
          aiPrice: "539",
        },
        {
          size: "Large",
          quantity: 8,
          price: "599",
          salePrice: "479",
          aiPrice: "539",
        },
      ],
      sku: "CT001-BLK",
      barcode: "8901234567890",
      status: "live",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1698512475067-74ed7c956c8d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Gaming Laptop Pro",
      category: "Electronics",
      subCategories: "Computers",
      hsn: "8471",
      sizes: [
        {
          size: "13 inch",
          quantity: 3,
          price: "85000",
          salePrice: "79999",
          aiPrice: "82499",
        },
        {
          size: "15 inch",
          quantity: 5,
          price: "95000",
          salePrice: "89999",
          aiPrice: "92499",
        },
      ],
      sku: "LP001-15I",
      barcode: "8901234567891",
      status: "live",
    },
    {
      id: 3,
      image:
        "https://plus.unsplash.com/premium_photo-1682096467444-8861e1dc3bc2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Wireless Headphones",
      category: "Electronics",
      subCategories: "Audio",
      hsn: "8518",
      sizes: [
        {
          size: "Standard",
          quantity: 0,
          price: "2499",
          salePrice: "1999",
          aiPrice: "2249",
        },
      ],
      sku: "WH001-BLK",
      barcode: "8901234567892",
      status: "draft",
    },
  ]);

  const [bulkActions, setBulkActions] = useState({
    moveToSale: false,
    keepCopyAndMove: false,
    moveToGyx: false,
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const subCategories = [...new Set(products.map((p) => p.subCategories))];

  // Enhanced notification system
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Product management functions
  const handleSaveProduct = async (productData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (productData.id && products.find((p) => p.id === productData.id)) {
      setProducts(
        products.map((p) => (p.id === productData.id ? productData : p))
      );
      showNotification("Product updated successfully!");
    } else {
      const newProduct = {
        ...productData,
        id: Date.now(),
        image: "https://via.placeholder.com/60x60/f3f4f6/9ca3af?text=P",
      };
      setProducts([...products, newProduct]);
      showNotification("Product added successfully!");
    }
    setShowEditModal(false);
    setCurrentProduct(null);
    setLoading(false);
  };

  const handleEdit = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setProducts(products.filter((p) => p.id !== currentProduct.id));
    setSelectedProducts(
      selectedProducts.filter((id) => id !== currentProduct.id)
    );
    setShowDeleteConfirm(false);
    setCurrentProduct(null);
    showNotification("Product deleted successfully!");
    setLoading(false);
  };

  const handleViewMetadata = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setShowMetadataModal(true);
  };

  // Selection functions
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  // Bulk actions
  const handleBulkActionChange = (action) => {
    setBulkActions((prev) => ({ ...prev, [action]: !prev[action] }));
  };

  const executeBulkActions = async () => {
    if (selectedProducts.length === 0) {
      showNotification("Please select products first", "error");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let message = "";
    const count = selectedProducts.length;

    if (bulkActions.moveToSale) {
      message += `${count} product${count > 1 ? "s" : ""} moved to sale. `;
    }
    if (bulkActions.keepCopyAndMove) {
      message += `${count} product${count > 1 ? "s" : ""} copied and moved. `;
    }
    if (bulkActions.moveToGyx) {
      message += `${count} product${count > 1 ? "s" : ""} moved to GYX. `;
    }

    if (message) {
      showNotification(message);
      setSelectedProducts([]);
      setBulkActions({
        moveToSale: false,
        keepCopyAndMove: false,
        moveToGyx: false,
      });
    }
    setLoading(false);
  };

  // Upload functions
  const handleBulkUpload = () => {
    setShowBulkUpload(true);
  };

  const handleSingleUpload = () => {
    setCurrentProduct(null);
    setShowEditModal(true);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification(`File "${file.name}" uploaded successfully!`);
      setShowBulkUpload(false);
      setLoading(false);
    }
  };

  // Sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Filtering and sorting
  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" ||
        selectedCategory === "All categories" ||
        product.category === selectedCategory) &&
      (selectedSubCategory === "" ||
        selectedSubCategory === "All subcategories" ||
        product.subCategories === selectedSubCategory)
  );

  if (sortConfig.key) {
    filteredProducts.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "text-orange-700 bg-orange-100 border-orange-200";
      case "live":
        return "text-green-700 bg-green-100 border-green-200";
      case "scheduled":
        return "text-blue-700 bg-blue-100 border-blue-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  // Calculate statistics
  const totalProducts = products.length;
  const liveProducts = products.filter((p) => p.status === "live").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;
  const outOfStock = products.reduce(
    (count, product) =>
      count + product.sizes.filter((size) => size.quantity === 0).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2">
          <div
            className={`p-4 rounded-xl shadow-lg border ${
              notification.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-green-50 border-green-200 text-green-800"
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === "error" ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Manage Items
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="primary" onClick={handleBulkUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="primary" onClick={handleSingleUpload}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={totalProducts}
            icon={<Package className="w-6 h-6" />}
            color="blue"
            trend={12}
          />
          <StatsCard
            title="Live Products"
            value={liveProducts}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            trend={8}
          />
          <StatsCard
            title="Draft Products"
            value={draftProducts}
            icon={<Edit className="w-6 h-6" />}
            color="orange"
          />
          <StatsCard
            title="Out of Stock"
            value={outOfStock}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="red"
            trend={-3}
          />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SearchBar
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dropdown
              options={categories}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder="All categories"
              icon={<Filter className="w-4 h-4" />}
            />
            <Dropdown
              options={subCategories}
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              placeholder="All subcategories"
            />
            <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 rounded-xl">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {filteredProducts.length} results
              </span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </th>
                  <th className="px-6 py-4">Image</th>
                  <th
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Product Name</span>
                      {sortConfig.key === "name" && (
                        <span className="text-blue-600">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      {sortConfig.key === "category" && (
                        <span className="text-blue-600">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4">Sub Categories</th>
                  <th className="px-6 py-4">HSN</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Sale Price</th>
                  <th className="px-6 py-4">AI Price</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Barcode</th>
                  <th
                    className="px-6 py-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {sortConfig.key === "status" && (
                        <span className="text-blue-600">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4">Metadata</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {filteredProducts.map((product) =>
                  product.sizes.map((sizeInfo, sizeIndex) => (
                    <tr
                      key={`${product.id}-${sizeIndex}`}
                      className="hover:bg-gray-50/30 transition-colors group"
                    >
                      {sizeIndex === 0 && (
                        <>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                            />
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                            />
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <div className="font-medium text-gray-900">
                              {product.name}
                            </div>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                              {product.category}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span className="text-sm text-gray-600">
                              {product.subCategories}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span className="text-sm font-mono text-gray-900">
                              {product.hsn}
                            </span>
                          </td>
                        </>
                      )}
                      <td className="px-6 py-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                          {sizeInfo.size}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${
                            sizeInfo.quantity === 0
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : sizeInfo.quantity < 10
                              ? "bg-orange-100 text-orange-700 border border-orange-200"
                              : "bg-green-100 text-green-700 border border-green-200"
                          }`}
                        >
                          {sizeInfo.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm font-medium text-gray-900">
                          ₹{sizeInfo.price}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm font-medium text-green-600">
                          ₹{sizeInfo.salePrice}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm font-medium text-blue-600">
                          ₹{sizeInfo.aiPrice}
                        </span>
                      </td>
                      {sizeIndex === 0 && (
                        <>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span className="text-sm font-mono text-gray-900">
                              {product.sku}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span className="text-sm font-mono text-gray-600">
                              {product.barcode}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                product.status
                              )}`}
                            >
                              {product.status.charAt(0).toUpperCase() +
                                product.status.slice(1)}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <Button
                              variant="ghost"
                              onClick={() => handleViewMetadata(product.id)}
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-6 py-4"
                          >
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(product.id)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="Edit product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <div className="mb-4">
                <Package className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={handleSingleUpload}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-blue-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="font-semibold text-blue-900">
                    {selectedProducts.length} product
                    {selectedProducts.length > 1 ? "s" : ""} selected
                  </span>
                  <label className="flex items-center cursor-pointer hover:bg-blue-100 px-2 py-1 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={bulkActions.moveToSale}
                      onChange={() => handleBulkActionChange("moveToSale")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-blue-800">Move to sale</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-100 px-2 py-1 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={bulkActions.keepCopyAndMove}
                      onChange={() => handleBulkActionChange("keepCopyAndMove")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-blue-800">Keep copy and move</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-100 px-2 py-1 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={bulkActions.moveToGyx}
                      onChange={() => handleBulkActionChange("moveToGyx")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-blue-800">Move to GYX</span>
                  </label>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedProducts([])}
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={executeBulkActions}
                    disabled={
                      loading ||
                      (!bulkActions.moveToSale &&
                        !bulkActions.keepCopyAndMove &&
                        !bulkActions.moveToGyx)
                    }
                    size="sm"
                  >
                    {loading ? "Processing..." : "Apply Actions"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Add Product Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setCurrentProduct(null);
        }}
        title={currentProduct ? "Edit Product" : "Add New Product"}
        size="lg"
      >
        <ProductForm
          product={currentProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowEditModal(false);
            setCurrentProduct(null);
          }}
        />
      </Modal>

      {/* Metadata Modal */}
      <Modal
        isOpen={showMetadataModal}
        onClose={() => {
          setShowMetadataModal(false);
          setCurrentProduct(null);
        }}
        title="Product Metadata"
      >
        {currentProduct && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Product ID
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {currentProduct.id}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    SKU
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {currentProduct.sku}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    HSN Code
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {currentProduct.hsn}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Barcode
                  </label>
                  <p className="text-lg font-mono text-gray-900">
                    {currentProduct.barcode}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Total Variants
                  </label>
                  <p className="text-lg font-bold text-gray-900">
                    {currentProduct.sizes.length}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Total Stock
                  </label>
                  <p className="text-lg font-bold text-gray-900">
                    {currentProduct.sizes.reduce(
                      (total, size) => total + size.quantity,
                      0
                    )}{" "}
                    units
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Size Breakdown
              </h4>
              <div className="space-y-3">
                {currentProduct.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  >
                    <span className="font-semibold text-gray-900">
                      {size.size}
                    </span>
                    <div className="flex space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600">Quantity</div>
                        <div className="font-bold text-gray-900">
                          {size.quantity}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Price</div>
                        <div className="font-bold text-gray-900">
                          ₹{size.price}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Sale Price</div>
                        <div className="font-bold text-green-600">
                          ₹{size.salePrice}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">AI Price</div>
                        <div className="font-bold text-blue-600">
                          ₹{size.aiPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setCurrentProduct(null);
        }}
        title="Delete Product"
        size="sm"
      >
        {currentProduct && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl border border-red-200">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  Are you sure?
                </h3>
                <p className="text-sm text-red-700">
                  This action cannot be undone. This will permanently delete the
                  product <strong>"{currentProduct.name}"</strong> and all its
                  variants.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCurrentProduct(null);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {loading ? "Deleting..." : "Delete Product"}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Bulk Upload Modal */}
      <Modal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        title="Bulk Upload Products"
      >
        <div className="space-y-8">
          <div className="text-center">
            <Upload className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Product File
            </h3>
            <p className="text-gray-600">
              Choose a CSV or Excel file to upload multiple products at once.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label
              htmlFor="file-upload"
              className={`cursor-pointer flex flex-col items-center ${
                loading ? "pointer-events-none" : ""
              }`}
            >
              <Upload
                className={`w-12 h-12 mb-4 ${
                  loading ? "text-gray-300" : "text-gray-400"
                }`}
              />
              <span className="text-lg font-medium text-gray-900 mb-1">
                {loading ? "Uploading..." : "Click to upload or drag and drop"}
              </span>
              <span className="text-sm text-gray-500">
                CSV, XLSX files up to 10MB
              </span>
            </label>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              File Format Requirements
            </h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Include columns: Name, Category, Sub Category, HSN, SKU, Barcode
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                For sizes: Size, Quantity, Price, Sale Price, AI Price
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Use separate rows for different sizes of the same product
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Status should be: draft, live, or scheduled
              </li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowBulkUpload(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                showNotification("Template downloaded successfully!");
              }}
              disabled={loading}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageItemsPage;
