import { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Upload,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import SearchBar from "../components/Searchbar";
import Dropdown from "../components/Dropdown";
import Button from "../components/Button";

// Create Category Page Component
const CreateCategoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategory: "",
    status: "active",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const categories = ["Electronics", "Clothing", "Books", "Home & Garden"];
  const subCategories = ["Smartphones", "Laptops", "Accessories"];

  const [categoryItems, setCategoryItems] = useState([
    {
      id: 1,
      image: "/api/placeholder/80/80",
      category: "Electronics",
      description: "Electronic devices and gadgets",
      parentCategory: "",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      image: "/api/placeholder/80/80",
      category: "Smartphones",
      description: "Mobile phones and accessories",
      parentCategory: "Electronics",
      status: "active",
      createdAt: "2024-01-16",
    },
    {
      id: 3,
      image: "/api/placeholder/80/80",
      category: "Clothing",
      description: "Apparel and fashion items",
      parentCategory: "",
      status: "inactive",
      createdAt: "2024-01-17",
    },
  ]);

  // Notification system
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Category name is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (formData.name.length < 2)
      errors.name = "Category name must be at least 2 characters";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      parentCategory: "",
      status: "active",
      image: null,
    });
    setFormErrors({});
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCategory = {
        id: Date.now(),
        category: formData.name,
        description: formData.description,
        parentCategory: formData.parentCategory,
        status: formData.status,
        image: formData.image || "/api/placeholder/80/80",
        createdAt: new Date().toISOString().split("T")[0],
      };

      setCategoryItems((prev) => [...prev, newCategory]);
      setShowAddModal(false);
      resetForm();
      showNotification("Category added successfully!");
    } catch (e) {
      showNotification("Failed to add category", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const handleEdit = (id) => {
    const item = categoryItems.find((cat) => cat.id === id);
    setSelectedCategory(item);
    setFormData({
      name: item.category,
      description: item.description,
      parentCategory: item.parentCategory || "",
      status: item.status,
      image: item.image,
    });
    setShowEditModal(true);
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCategoryItems((prev) =>
        prev.map((item) =>
          item.id === selectedCategory.id
            ? {
                ...item,
                category: formData.name,
                description: formData.description,
                parentCategory: formData.parentCategory,
                status: formData.status,
                image: formData.image,
              }
            : item
        )
      );

      setShowEditModal(false);
      resetForm();
      setSelectedCategory(null);
      showNotification("Category updated successfully!");
    } catch (e) {
      showNotification("Failed to update category", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = (id) => {
    const item = categoryItems.find((cat) => cat.id === id);
    setSelectedCategory(item);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCategoryItems((prev) =>
        prev.filter((item) => item.id !== selectedCategory.id)
      );
      setShowDeleteDialog(false);
      setSelectedCategory(null);
      showNotification("Category deleted successfully!");
    } catch (e) {
      showNotification("Failed to delete category", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Bulk operations
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredCategories.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCategoryItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems([]);
      showNotification(
        `${selectedItems.length} categories deleted successfully!`
      );
    } catch (e) {
      showNotification("Failed to delete categories", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedItems.length === 0) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCategoryItems((prev) =>
        prev.map((item) =>
          selectedItems.includes(item.id)
            ? { ...item, status: newStatus }
            : item
        )
      );
      setSelectedItems([]);
      showNotification(
        `${selectedItems.length} categories ${
          newStatus === "active" ? "activated" : "deactivated"
        }!`
      );
    } catch (e) {
      showNotification("Failed to update categories", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories
  const filteredCategories = categoryItems.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || item.parentCategory === category;
    const matchesSubCategory =
      subCategory === "" || item.category === subCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Notification Component
  const Notification = ({ notification }) => {
    if (!notification) return null;

    const bgColor =
      notification.type === "error" ? "bg-red-500" : "bg-green-500";
    const icon =
      notification.type === "error" ? (
        <AlertTriangle className="w-5 h-5" />
      ) : (
        <Check className="w-5 h-5" />
      );

    return (
      <div
        className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`}
      >
        {icon}
        <span>{notification.message}</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Category</h1>
          <div className="flex space-x-3">
            <Button
              onClick={() => setShowAddModal(true)}
              className="flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
            {selectedItems.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  onClick={() => handleBulkStatusChange("active")}
                >
                  Activate Selected
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleBulkStatusChange("inactive")}
                >
                  Deactivate Selected
                </Button>
                <Button
                  variant="danger"
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Selected ({selectedItems.length})
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SearchBar
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dropdown
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Filter by parent category"
            />
            <Dropdown
              options={subCategories}
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Filter by subcategory"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded ${
                  viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header with bulk select */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedItems.length === filteredCategories.length &&
                  filteredCategories.length > 0
                }
                className="rounded"
              />
              <span className="text-sm text-gray-600">
                {selectedItems.length > 0
                  ? `${selectedItems.length} selected`
                  : `${filteredCategories.length} categories`}
              </span>
            </div>
          </div>

          {viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded"
                    />
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-center mb-3">
                    <img
                      src={item.image}
                      alt="Category"
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100 mx-auto"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-center mb-2">
                    {item.category}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div>
              <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 font-medium text-gray-600 text-sm">
                <div>Select</div>
                <div>Image</div>
                <div>Category</div>
                <div>Description</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <img
                      src={item.image}
                      alt="Category"
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.category}
                    </h3>
                    {item.parentCategory && (
                      <p className="text-xs text-gray-500">
                        Parent: {item.parentCategory}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No categories found matching your criteria.</p>
              <Button onClick={() => setShowAddModal(true)} className="mt-4">
                Add First Category
              </Button>
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          title="Add New Category"
        >
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter category name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows="3"
                placeholder="Enter category description"
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                value={formData.parentCategory}
                onChange={(e) =>
                  handleInputChange("parentCategory", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select parent category (optional)</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
              {formErrors.image && (
                <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                disabled={loading}
                className="flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  "Add Category"
                )}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Category Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            resetForm();
            setSelectedCategory(null);
          }}
          title="Edit Category"
        >
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter category name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.description ? "border-red-500" : "border-gray-300"
                }`}
                rows="3"
                placeholder="Enter category description"
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                value={formData.parentCategory}
                onChange={(e) =>
                  handleInputChange("parentCategory", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select parent category (optional)</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                  setSelectedCategory(null);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCategory}
                disabled={loading}
                className="flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Modal
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedCategory(null);
          }}
          title="Confirm Delete"
        >
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <p className="text-gray-900">
                Are you sure you want to delete the category "
                {selectedCategory?.category}"?
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedCategory(null);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Notification */}
        <Notification notification={notification} />

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCategoryPage;
