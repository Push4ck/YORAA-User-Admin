import { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Upload,
  X,
  Check,
  AlertTriangle,
  Search,
  Filter,
  Grid3X3,
  List,
  Image as ImageIcon,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";

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
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

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
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop",
      category: "Electronics",
      description: "Electronic devices and gadgets for modern living",
      parentCategory: "",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop",
      category: "Smartphones",
      description: "Latest mobile phones and accessories",
      parentCategory: "Electronics",
      status: "active",
      createdAt: "2024-01-16",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop",
      category: "Clothing",
      description: "Fashion apparel and lifestyle clothing",
      parentCategory: "",
      status: "inactive",
      createdAt: "2024-01-17",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80&h=80&fit=crop",
      category: "Books",
      description: "Educational and entertainment literature",
      parentCategory: "",
      status: "active",
      createdAt: "2024-01-18",
    },
  ]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Category name is required";
    if (!formData.description.trim())
      errors.description = "Description is required";
    if (formData.name.length < 2)
      errors.name = "Category name must be at least 2 characters";
    if (formData.description.length < 10)
      errors.description = "Description must be at least 10 characters";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
        setFormErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newCategory = {
        id: Date.now(),
        category: formData.name,
        description: formData.description,
        parentCategory: formData.parentCategory,
        status: formData.status,
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=80&h=80&fit=crop",
        createdAt: new Date().toISOString().split("T")[0],
      };

      setCategoryItems((prev) => [...prev, newCategory]);
      setShowAddModal(false);
      resetForm();
      showNotification("Category added successfully!");
    } catch {
      showNotification("Failed to add category", "error");
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpdateCategory = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

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
    } catch {
      showNotification("Failed to update category", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    const item = categoryItems.find((cat) => cat.id === id);
    setSelectedCategory(item);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCategoryItems((prev) =>
        prev.filter((item) => item.id !== selectedCategory.id)
      );
      setShowDeleteDialog(false);
      setSelectedCategory(null);
      showNotification("Category deleted successfully!");
    } catch {
      showNotification("Failed to delete category", "error");
    } finally {
      setLoading(false);
    }
  };

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
    } catch {
      showNotification("Failed to delete categories", "error");
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
    } catch {
      showNotification("Failed to update categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categoryItems.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || item.parentCategory === category;
    const matchesSubCategory =
      subCategory === "" || item.category === subCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

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
        className={`fixed top-6 right-6 z-50 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-top-2 duration-300`}
      >
        {icon}
        <span className="font-medium">{notification.message}</span>
      </div>
    );
  };

  const Button = ({
    children,
    variant = "primary",
    onClick,
    disabled = false,
    className = "",
    ...props
  }) => {
    const baseClasses =
      "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
      danger:
        "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Category Management
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Organize and manage your product categories
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Add Category
              </Button>
            </div>
          </div>

          {/* Bulk Actions Bar */}
          {selectedItems.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-blue-800 font-medium">
                    {selectedItems.length} categories selected
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => handleBulkStatusChange("active")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleBulkStatusChange("inactive")}
                  >
                    <EyeOff className="w-4 h-4 mr-2" />
                    Deactivate
                  </Button>
                  <Button variant="danger" onClick={handleBulkDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete ({selectedItems.length})
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Search & Filter
            </h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Subcategories</option>
                    {subCategories.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center transition-all ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4 mr-2" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center transition-all ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <List className="w-4 h-4 mr-2" />
                      List
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header with bulk select */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedItems.length === filteredCategories.length &&
                    filteredCategories.length > 0
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  {selectedItems.length > 0
                    ? `${selectedItems.length} selected`
                    : `${filteredCategories.length} categories`}
                </label>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Total: {filteredCategories.length}
            </div>
          </div>

          {viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {filteredCategories.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="relative mx-auto w-20 h-20 mb-3">
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=80&h=80&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {item.category}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                    {item.parentCategory && (
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                        Parent: {item.parentCategory}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 transition-colors rounded-xl"
                      title="Edit category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 transition-colors rounded-xl"
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Select
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.category}
                          className="w-12 h-12 object-cover rounded-xl shadow-sm"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=80&h=80&fit=crop";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.category}
                          </h3>
                          {item.parentCategory && (
                            <p className="text-sm text-gray-500">
                              Parent: {item.parentCategory}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {item.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                            title="Edit category"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                            title="Delete category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-600 mb-6">
                No categories match your search criteria. Try adjusting your
                filters.
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCategory();
            }}
          >
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter category name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={formData.parentCategory}
                    onChange={(e) =>
                      handleInputChange("parentCategory", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Select parent category (optional)</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows="4"
                  placeholder="Enter a detailed description of the category"
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-3 flex items-center space-x-3">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-xl shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: null }))
                        }
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {formErrors.image && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {formErrors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                type="button"
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
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </>
                )}
              </Button>
            </div>
          </form>
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateCategory();
            }}
          >
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter category name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    value={formData.parentCategory}
                    onChange={(e) =>
                      handleInputChange("parentCategory", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Select parent category (optional)</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows="4"
                  placeholder="Enter a detailed description of the category"
                />
                {formErrors.description && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <label
                      htmlFor="edit-image-upload"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </label>
                  </div>
                  {formData.image && (
                    <div className="mt-3 flex items-center space-x-3">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-xl shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: null }))
                        }
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                type="button"
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
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Category
                  </>
                )}
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Modal
          isOpen={showDeleteDialog}
          onClose={() => {
            setShowDeleteDialog(false);
            setSelectedCategory(null);
          }}
          title="Confirm Delete"
          size="lg"
        >
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Delete Category
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete the category "
                  {selectedCategory?.category}"? This action cannot be undone
                  and will permanently remove all associated data.
                </p>
                {selectedCategory?.image && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={selectedCategory.image}
                      alt={selectedCategory.category}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedCategory.category}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedCategory.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

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
                variant="danger"
                onClick={confirmDelete}
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Category
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Notification */}
        <Notification notification={notification} />

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 flex items-center space-x-4 shadow-2xl">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-700 font-medium">Processing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCategoryPage;
