import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import ManageItemsPage from "./pages/ManageItemsPage";
import UploadItems from "./pages/UploadItems";
import ArrangementControl from "./pages/ArrangementControlPage";
import BundlingPage from "./pages/BundlingPage";

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
        <Route path="/arrangement-control" element={<ArrangementControl />} />
        <Route path="/product-bundling" element={<BundlingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
