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
  AlertCircle,
} from "lucide-react";
import Button from "../components/Button";
import SearchBar from "../components/Searchbar";
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";

// // Search Bar Component
// const SearchBar = ({ placeholder, value, onChange }) => (
//   <div className="relative">
//     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//     <input
//       type="text"
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//     />
//   </div>
// );

// // Dropdown Component
// const Dropdown = ({ options, value, onChange, placeholder }) => (
//   <select
//     value={value}
//     onChange={onChange}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//   >
//     <option value="">{placeholder}</option>
//     {options.map((option, index) => (
//       <option key={index} value={option}>
//         {option}
//       </option>
//     ))}
//   </select>
// );

// Modal Component

// Product Form Component
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Category
          </label>
          <input
            type="text"
            value={formData.subCategories}
            onChange={(e) => handleInputChange("subCategories", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HSN Code
          </label>
          <input
            type="text"
            value={formData.hsn}
            onChange={(e) => handleInputChange("hsn", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            value={formData.sku}
            onChange={(e) => handleInputChange("sku", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barcode
          </label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => handleInputChange("barcode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="live">Live</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Sizes & Variants
          </label>
          <Button type="button" onClick={addSize} className="text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Size
          </Button>
        </div>

        {formData.sizes.map((size, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-2"
          >
            <div className="grid grid-cols-6 gap-2 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Size
                </label>
                <input
                  type="text"
                  value={size.size}
                  onChange={(e) =>
                    handleSizeChange(index, "size", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="S, M, L..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
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
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={size.price}
                  onChange={(e) =>
                    handleSizeChange(index, "price", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sale Price
                </label>
                <input
                  type="text"
                  value={size.salePrice}
                  onChange={(e) =>
                    handleSizeChange(index, "salePrice", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  AI Price
                </label>
                <input
                  type="text"
                  value={size.aiPrice}
                  onChange={(e) =>
                    handleSizeChange(index, "aiPrice", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                {formData.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
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

  const [products, setProducts] = useState([
    {
      id: 1,
      image: "/api/placeholder/60/60",
      name: "T shirt",
      category: "Clothing",
      subCategories: "T shirt",
      hsn: "4566",
      sizes: [
        {
          size: "small",
          quantity: 5,
          price: "4566",
          salePrice: "4566",
          aiPrice: "4566",
        },
        {
          size: "medium",
          quantity: 10,
          price: "4566",
          salePrice: "4566",
          aiPrice: "4566",
        },
        {
          size: "large",
          quantity: 0,
          price: "4566",
          salePrice: "4566",
          aiPrice: "4566",
        },
      ],
      sku: "blk/m/nsol23",
      barcode: "456000000000000",
      status: "draft",
    },
    {
      id: 2,
      image: "/api/placeholder/60/60",
      name: "Laptop",
      category: "Electronics",
      subCategories: "Computers",
      hsn: "8471",
      sizes: [
        {
          size: "13 inch",
          quantity: 3,
          price: "50000",
          salePrice: "45000",
          aiPrice: "47000",
        },
        {
          size: "15 inch",
          quantity: 5,
          price: "60000",
          salePrice: "55000",
          aiPrice: "57000",
        },
      ],
      sku: "lap/15/dell24",
      barcode: "789000000000000",
      status: "live",
    },
  ]);

  const [bulkActions, setBulkActions] = useState({
    moveToSale: false,
    keepCopyAndMove: false,
    moveToGyx: false,
  });

  const categories = [
    "All categories",
    ...new Set(products.map((p) => p.category)),
  ];
  const subCategories = [
    "All subcategories",
    ...new Set(products.map((p) => p.subCategories)),
  ];

  // Notification system
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Product management functions
  const handleSaveProduct = (productData) => {
    if (productData.id && products.find((p) => p.id === productData.id)) {
      setProducts(
        products.map((p) => (p.id === productData.id ? productData : p))
      );
      showNotification("Product updated successfully!");
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
      showNotification("Product added successfully!");
    }
    setShowEditModal(false);
    setCurrentProduct(null);
  };

  const handleEdit = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (productId) => {
    setCurrentProduct(products.find((p) => p.id === productId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== currentProduct.id));
    setShowDeleteConfirm(false);
    setCurrentProduct(null);
    showNotification("Product deleted successfully!", "success");
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

  const executeBulkActions = () => {
    if (selectedProducts.length === 0) {
      showNotification("Please select products first", "error");
      return;
    }

    let message = "";
    if (bulkActions.moveToSale) {
      message += `${selectedProducts.length} products moved to sale. `;
    }
    if (bulkActions.keepCopyAndMove) {
      message += `${selectedProducts.length} products copied and moved. `;
    }
    if (bulkActions.moveToGyx) {
      message += `${selectedProducts.length} products moved to GYX. `;
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
  };

  // Upload functions
  const handleBulkUpload = () => {
    setShowBulkUpload(true);
  };

  const handleSingleUpload = () => {
    setCurrentProduct(null);
    setShowEditModal(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      showNotification(`File "${file.name}" uploaded successfully!`);
      setShowBulkUpload(false);
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
        return "text-orange-600 bg-orange-100";
      case "live":
        return "text-green-600 bg-green-100";
      case "scheduled":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {notification.message}
          </div>
        </div>
      )}

      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Items</h1>
            <p className="text-gray-600 mt-1">
              {products.length} total products • {filteredProducts.length}{" "}
              showing
            </p>
          </div>
          <div className="flex space-x-4">
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

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            />
            <Dropdown
              options={subCategories}
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              placeholder="All subcategories"
            />
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {selectedProducts.length} selected
              </span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded text-blue-600"
                    />
                  </th>
                  <th className="px-4 py-3">Image</th>
                  <th
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    Product Name{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("category")}
                  >
                    Category{" "}
                    {sortConfig.key === "category" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-4 py-3">Sub categories</th>
                  <th className="px-4 py-3">HSN</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Sale price</th>
                  <th className="px-4 py-3">AI price</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Barcode</th>
                  <th
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("status")}
                  >
                    Status{" "}
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-4 py-3">Metadata</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) =>
                  product.sizes.map((sizeInfo, sizeIndex) => (
                    <tr
                      key={`${product.id}-${sizeIndex}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {sizeIndex === 0 && (
                        <>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                              className="rounded text-blue-600"
                            />
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                            />
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">
                                {product.name}
                              </span>
                              <div className="ml-2 w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs">
                                i
                              </div>
                            </div>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4 text-sm text-gray-900"
                          >
                            {product.category}
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4 text-sm text-gray-900"
                          >
                            {product.subCategories}
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4 text-sm text-gray-900"
                          >
                            {product.hsn}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {sizeInfo.size}
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span
                          className={
                            sizeInfo.quantity === 0
                              ? "text-red-600"
                              : "text-gray-900"
                          }
                        >
                          {sizeInfo.quantity}
                          {sizeInfo.quantity === 0 && (
                            <span className="ml-1 text-xs">(Out of Stock)</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        ₹{sizeInfo.price}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        ₹{sizeInfo.salePrice}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        ₹{sizeInfo.aiPrice}
                      </td>
                      {sizeIndex === 0 && (
                        <>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4 text-sm text-gray-900"
                          >
                            {product.sku}
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4 text-sm text-gray-900"
                          >
                            {product.barcode}
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                product.status
                              )}`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <Button
                              variant="secondary"
                              onClick={() => handleViewMetadata(product.id)}
                              className="text-xs px-3 py-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </td>
                          <td
                            rowSpan={product.sizes.length}
                            className="px-4 py-4"
                          >
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(product.id)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50"
                                title="Edit product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
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
            <div className="p-8 text-center text-gray-500">
              <div className="mb-4">
                <Filter className="w-12 h-12 text-gray-300 mx-auto" />
              </div>
              <p className="text-lg font-medium mb-2">No products found</p>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium text-blue-900">
                    {selectedProducts.length} product(s) selected
                  </span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bulkActions.moveToSale}
                      onChange={() => handleBulkActionChange("moveToSale")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    Move to sale
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bulkActions.keepCopyAndMove}
                      onChange={() => handleBulkActionChange("keepCopyAndMove")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    Keep copy and move
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bulkActions.moveToGyx}
                      onChange={() => handleBulkActionChange("moveToGyx")}
                      className="mr-2 text-blue-600 rounded focus:ring-blue-500"
                    />
                    Move to GYX
                  </label>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedProducts([])}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={executeBulkActions}
                    disabled={
                      !bulkActions.moveToSale &&
                      !bulkActions.keepCopyAndMove &&
                      !bulkActions.moveToGyx
                    }
                  >
                    Apply Actions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Live Products
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.status === "live").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Draft Products
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {products.filter((p) => p.status === "draft").length}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Edit className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {products.reduce(
                    (count, product) =>
                      count +
                      product.sizes.filter((size) => size.quantity === 0)
                        .length,
                    0
                  )}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product ID
                </label>
                <p className="text-sm text-gray-900">{currentProduct.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <p className="text-sm text-gray-900">{currentProduct.sku}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Barcode
                </label>
                <p className="text-sm text-gray-900">
                  {currentProduct.barcode}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HSN Code
                </label>
                <p className="text-sm text-gray-900">{currentProduct.hsn}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Variants
                </label>
                <p className="text-sm text-gray-900">
                  {currentProduct.sizes.length}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Stock
                </label>
                <p className="text-sm text-gray-900">
                  {currentProduct.sizes.reduce(
                    (total, size) => total + size.quantity,
                    0
                  )}{" "}
                  units
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size Breakdown
              </label>
              <div className="space-y-2">
                {currentProduct.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <span className="font-medium">{size.size}</span>
                    <div className="flex space-x-4 text-sm">
                      <span>Qty: {size.quantity}</span>
                      <span>Price: ₹{size.price}</span>
                      <span>Sale: ₹{size.salePrice}</span>
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
      >
        {currentProduct && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="font-medium text-red-800">Are you sure?</h3>
                <p className="text-sm text-red-600">
                  This action cannot be undone. This will permanently delete the
                  product "{currentProduct.name}".
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setCurrentProduct(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
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
        <div className="space-y-6">
          <div className="text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Product File
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose a CSV or Excel file to upload multiple products at once.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-10 h-10 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">
                CSV, XLSX files up to 10MB
              </span>
            </label>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">
              File Format Requirements:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • Include columns: Name, Category, Sub Category, HSN, SKU,
                Barcode
              </li>
              <li>• For sizes: Size, Quantity, Price, Sale Price, AI Price</li>
              <li>
                • Use separate rows for different sizes of the same product
              </li>
              <li>• Status should be: draft, live, or scheduled</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowBulkUpload(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // Download template logic here
                showNotification("Template downloaded successfully!");
              }}
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
