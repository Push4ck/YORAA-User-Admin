import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/create-category", label: "Create Category" },
    { path: "/manage-items", label: "Manage Items" },
    { path: "/upload-items", label: "Upload Items" },
    { path: "/arrangement-control", label: "Arrangement Control" },
    { path: "/product-bundling", label: "Product Bundling" },
  ];

  return (
    <aside className="w-56 bg-white shadow-md p-6">
      <h1 className="text-xl font-bold mb-8">YORAA</h1>
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `font-medium hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
