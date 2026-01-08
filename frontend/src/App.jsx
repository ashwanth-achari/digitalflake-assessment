import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import ProtectedRoute from "./routes/ProtectedRoutes";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Products from "./pages/Products";
import CategoryUpdate from "./pages/CategoryUpdate";
import Logout from "./services/Logout";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="categories" element={<Categories />} />
        <Route path="subcategories" element={<SubCategories />} />
        <Route path="products" element={<Products />} />
        <Route path="/categories/:id" element={<CategoryUpdate />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
