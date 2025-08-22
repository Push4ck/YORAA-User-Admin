import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Grid3X3,
  List,
  MoreHorizontal,
  GripVertical,
  Settings,
  Eye,
  Package,
} from "lucide-react";

// Dropdown Component with enhanced functionality
const Dropdown = ({ value, options, placeholder, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-gray-400">{icon}</div>}
          <span className={`${value ? "text-gray-900" : "text-gray-500"}`}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors text-gray-700"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Enhanced Draggable Arrangement Item Component
const ArrangementItem = ({
  title,
  description,
  index,
  onDragStart,
  onDrop,
  isDragging,
}) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(index)}
      className={`flex items-center p-4 bg-white border rounded-xl hover:shadow-md cursor-move transition-all group ${
        isDragging ? "opacity-50 shadow-lg" : "border-gray-200"
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Eye className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

// Enhanced Sport Category Item Component
const SportCategoryItem = ({ title, onClick, isActive, count = 0 }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
        isActive
          ? "bg-blue-50 border-blue-200 shadow-sm"
          : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <Package
            className={`w-5 h-5 ${
              isActive ? "text-blue-600" : "text-gray-600"
            }`}
          />
        </div>
        <div>
          <span
            className={`text-sm font-medium ${
              isActive ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {title}
          </span>
          {count > 0 && (
            <span className="text-xs text-gray-500 block">{count} items</span>
          )}
        </div>
      </div>
      <ChevronRight
        className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-gray-400"}`}
      />
    </div>
  );
};

// Enhanced Product Card Component
const ProductCard = ({
  title,
  description,
  price,
  view,
  isSelected,
  onSelect,
  image,
}) => {
  if (view === "list") {
    return (
      <div
        onClick={onSelect}
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
          isSelected
            ? "bg-blue-50 border-blue-200"
            : "bg-white border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
          <img
            src={
              image || "https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=P"
            }
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
          <p className="text-sm font-bold text-gray-900 mt-2">{price}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
        isSelected
          ? "bg-blue-50 border-blue-200 shadow-md"
          : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
      }`}
    >
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={
            image ||
            "https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Product"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-xs text-gray-600 mb-3">{description}</p>
        <p className="text-sm font-bold text-gray-900">{price}</p>
      </div>
    </div>
  );
};

// Enhanced View Toggle Component
const ViewToggle = ({ view, onViewChange }) => {
  const views = [
    { id: "list", icon: List, label: "List" },
    { id: "grid", icon: Grid3X3, label: "Grid" },
    { id: "detailed", icon: MoreHorizontal, label: "Detailed" },
  ];

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      {views.map(({ id, icon: IconComponent, label }) => {
        const Icon = IconComponent;
        return (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`p-2 rounded-md flex items-center gap-2 transition-all ${
              view === id
                ? "bg-white shadow-sm text-blue-600"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

// Enhanced Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange, tabCounts = {} }) => {
  const tabs = ["My", "Men", "Women", "Kids"];

  return (
    <div className="flex border-b border-gray-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${
            activeTab === tab
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}{" "}
          {tabCounts[tab] > 0 && (
            <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
              {tabCounts[tab]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Main Page Component with full functionality
const ArrangementControlPage = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [item, setItem] = useState("");
  const [activeTab, setActiveTab] = useState("My");
  const [view, setView] = useState("grid");
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("Running");

  // Sample data with state management
  const [arrangementItems, setArrangementItems] = useState([
    {
      icon: "account",
      title: "Account Management",
      description: "Manage account and services linked to your Yoraa account",
    },
    {
      icon: "products",
      title: "Product Catalog",
      description: "Organize and manage your product inventory",
    },
    {
      icon: "orders",
      title: "Order Management",
      description: "Track and manage customer orders",
    },
    {
      icon: "analytics",
      title: "Analytics Dashboard",
      description: "View sales and performance metrics",
    },
    {
      icon: "settings",
      title: "System Settings",
      description: "Configure system preferences and options",
    },
    {
      icon: "support",
      title: "Customer Support",
      description: "Help desk and customer service tools",
    },
  ]);

  const productsByCategory = {
    Running: [
      {
        title: "Nike Air Max Running Shoes",
        description: "Professional running shoes with air cushioning",
        price: "US$150",
        category: "Men",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      },
      {
        title: "Adidas Ultraboost 22",
        description: "Energy return running shoes",
        price: "US$180",
        category: "Men",
        image: "https://m.media-amazon.com/images/I/71DnJOk0AOL.jpg",
      },
      {
        title: "Running Compression Socks",
        description: "Performance crew socks (3 pairs)",
        price: "US$22",
        category: "Unisex",
        image:
          "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRFM9tRyvDfqKBCj2au3K7VjLdDnNFbkxE4v0VXhufrAtjLicPoaI9jmfb5Pj3PFutAq0tS5FioyMIIEEtJmlSGxYPdBiZXl4ntC0ZOVB4nemx5hxvtaZADAQ",
      },
      {
        title: "Nike Dri-FIT Running Shorts",
        description: "Moisture-wicking athletic shorts",
        price: "US$45",
        category: "Women",
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTWj-KzPbx4b3YCormBa3NoLCV3KeGxWS47IuMe6PrbAunjyx59Bq21-zOQqvtfCirn739jxrrvS_nmVbXVV1zlWrlrVmBqI0YqmaX5KaNp9JQ4Sfhqr1jGvA",
      },
    ],
    Soccer: [
      {
        title: "Nike Mercurial Soccer Cleats",
        description: "Professional soccer cleats",
        price: "US$120",
        category: "Men",
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgj0L_4PfH68NffbEUGNpPX9_PN68gsiqQgwOUs0poHWwCLEoP-C_J2ZD8AJR5hRqz6eLU7-DeDm9RFpxAaS_4gXaM11x9IHEWYtcjXW8ElQDXRWof0mj8Aw",
      },
      {
        title: "Adidas Soccer Ball",
        description: "Official size soccer ball",
        price: "US$25",
        category: "Unisex",
        image:
          "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/ffaf6e526a654ce4a7f9af2e007e5ca1_9366/tiro-league-thermally-bonded-ball.jpg",
      },
    ],
    Tennis: [
      {
        title: "Wilson Tennis Racket",
        description: "Professional grade tennis racket",
        price: "US$200",
        category: "Unisex",
        image:
          "https://tennisoutlet.in/media/catalog/product/cache/3e55a65e2663b06e08fdf4ec11ab6e8f/r/h/TRAB0174_1.webp",
      },
      {
        title: "Tennis Ball Set",
        description: "Premium tennis balls (4 pack)",
        price: "US$15",
        category: "Unisex",
        image:
          "https://m.media-amazon.com/images/I/41FpZsVDKCL._UF894,1000_QL80_.jpg",
      },
    ],
    Golf: [
      {
        title: "Callaway Golf Driver",
        description: "High performance golf driver",
        price: "US$400",
        category: "Men",
        image: "https://m.media-amazon.com/images/I/71i9YBQlGML.jpg",
      },
      {
        title: "Golf Ball Set",
        description: "Premium golf balls (12 pack)",
        price: "US$35",
        category: "Unisex",
        image: "https://m.media-amazon.com/images/I/919WVhlRssL.jpg",
      },
    ],
    Basketball: [
      {
        title: "Nike Basketball Shoes",
        description: "High-top basketball sneakers",
        price: "US$130",
        category: "Men",
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSN4vC_wFhDwzgabBXoGxx7KQIPKtFwn75PNs5UwHG3aRwD2kcqVG5wtbnV2T_V6YkF97YXEtZa5y7FMlnPWJDl4YgqvujpNQw-rpfCknD3Hi3wmqpbrw0PcQ",
      },
      {
        title: "Spalding Basketball",
        description: "Official size basketball",
        price: "US$30",
        category: "Unisex",
        image:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTMCiExUaRWCxtWarpTjagN1jNf3eimHM6GszSzcX-mzZ3IjODaXf9-eoVHf3628qP0AZXc1t-gSv9VG1egP9PgAn5FQUQ38EJW-0nEH3FxkiJ0PJwJpgWcKw",
      },
    ],
    Swimming: [
      {
        title: "Speedo Swimsuit",
        description: "Competitive swimming suit",
        price: "US$80",
        category: "Women",
        image: "https://m.media-amazon.com/images/I/71ywF1hTD-L.jpg",
      },
      {
        title: "Swimming Goggles",
        description: "Anti-fog swimming goggles",
        price: "US$25",
        category: "Unisex",
        image: "https://m.media-amazon.com/images/I/61YvM6WnsNL.jpg",
      },
    ],
  };

  const sportCategories = Object.entries(productsByCategory).map(
    ([category, products]) => ({
      title: category,
      count: products.length,
    })
  );

  // Calculate dynamic tab counts based on current data
  const tabCounts = {
    My: selectedProducts.size,
    Men:
      productsByCategory[selectedCategory]?.filter((p) => p.category === "Men")
        .length || 0,
    Women:
      productsByCategory[selectedCategory]?.filter(
        (p) => p.category === "Women"
      ).length || 0,
    Kids:
      productsByCategory[selectedCategory]?.filter((p) => p.category === "Kids")
        .length || 0,
    Unisex:
      productsByCategory[selectedCategory]?.filter(
        (p) => p.category === "Unisex"
      ).length || 0,
  };

  // Drag and drop functionality
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDrop = (dropIndex) => {
    if (draggedItem === null) return;

    const newItems = [...arrangementItems];
    const draggedItemData = newItems[draggedItem];

    // Remove the dragged item
    newItems.splice(draggedItem, 1);

    // Insert it at the new position
    newItems.splice(dropIndex, 0, draggedItemData);

    setArrangementItems(newItems);
    setDraggedItem(null);
  };

  // Product selection functionality
  const handleProductSelect = (productTitle) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productTitle)) {
      newSelected.delete(productTitle);
    } else {
      newSelected.add(productTitle);
    }
    setSelectedProducts(newSelected);
  };

  // Reset arrangement order
  const handleResetOrder = () => {
    const originalOrder = [
      {
        icon: "account",
        title: "Account Management",
        description: "Manage account and services linked to your Yoraa account",
      },
      {
        icon: "products",
        title: "Product Catalog",
        description: "Organize and manage your product inventory",
      },
      {
        icon: "orders",
        title: "Order Management",
        description: "Track and manage customer orders",
      },
      {
        icon: "analytics",
        title: "Analytics Dashboard",
        description: "View sales and performance metrics",
      },
      {
        icon: "settings",
        title: "System Settings",
        description: "Configure system preferences and options",
      },
      {
        icon: "support",
        title: "Customer Support",
        description: "Help desk and customer service tools",
      },
    ];
    setArrangementItems(originalOrder);
  };

  // Apply changes functionality
  const handleApplyChanges = () => {
    console.log("Applying changes:", {
      category,
      subCategory,
      item,
      arrangementOrder: arrangementItems.map((item) => item.title),
      selectedProducts: Array.from(selectedProducts),
    });
    alert("Changes applied successfully!");
  };

  const currentProducts = productsByCategory[selectedCategory] || [];

  return (
    <div className="max-w-7xl p-6 space-y-14">
      {/* Enhanced Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Arrangement Control Center
        </h1>
        <p className="text-gray-600">
          Organize categories, subcategories, items and their display order
        </p>
      </div>

      {/* Enhanced Rearrange Section */}
      <div className="rounded-2xl p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-900">
            Choose Items to Rearrange
          </h2>
        </div>

        {/* Enhanced Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Dropdown
              value={category}
              placeholder="Select Category"
              options={["Sports", "Fashion", "Electronics", "Home & Garden"]}
              onChange={setCategory}
              icon={<Package className="w-4 h-4" />}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <Dropdown
              value={subCategory}
              placeholder="Select Sub Category"
              options={["Footwear", "Apparel", "Equipment", "Accessories"]}
              onChange={setSubCategory}
              icon={<Package className="w-4 h-4" />}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Type
            </label>
            <Dropdown
              value={item}
              placeholder="Select Item Type"
              options={["Socks", "Shoes", "Shirts", "Shorts"]}
              onChange={setItem}
              icon={<Package className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Draggable Arrangement Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {arrangementItems.map((item, index) => (
            <ArrangementItem
              key={index}
              title={item.title}
              description={item.description}
              index={index}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              isDragging={draggedItem === index}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleApplyChanges}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
          >
            Apply Changes
          </button>
          <button
            onClick={handleResetOrder}
            className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
          >
            Reset Order
          </button>
        </div>
      </div>

      {/* Enhanced Preview Section */}
      <div className="rounded-2xl p-8 shadow-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              Live Preview
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">View Mode</span>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Enhanced Categories */}
          <div className="space-y-6">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabCounts={tabCounts}
            />
            <div className="space-y-3">
              {sportCategories.map((sport, index) => (
                <SportCategoryItem
                  key={index}
                  title={sport.title}
                  count={sport.count}
                  isActive={selectedCategory === sport.title}
                  onClick={() => setSelectedCategory(sport.title)}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Enhanced Products */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCategory} Products
              </h3>
              <span className="text-sm text-gray-600">
                {selectedProducts.size} selected
              </span>
            </div>

            <div
              className={`grid gap-4 ${
                view === "list"
                  ? "grid-cols-1"
                  : view === "grid"
                  ? "grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  view={view}
                  isSelected={selectedProducts.has(product.title)}
                  onSelect={() => handleProductSelect(product.title)}
                />
              ))}
            </div>

            {currentProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No products found for {selectedCategory}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrangementControlPage;
