import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import ManageItemsPage from "./pages/ManageItemsPage";
import UploadItems from "./pages/UploadItems";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/create-category" element={<CreateCategoryPage />} />
        <Route path="/manage-items" element={<ManageItemsPage />} />
        <Route path="/upload-items" element={<UploadItems />} />
      </Route>
    </Routes>
  );
};

export default App;
