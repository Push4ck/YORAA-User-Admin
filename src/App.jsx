import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import ManageItemsPage from "./pages/ManageItemsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/create-category" element={<CreateCategoryPage />} />
        <Route path="/manage-items" element={<ManageItemsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
