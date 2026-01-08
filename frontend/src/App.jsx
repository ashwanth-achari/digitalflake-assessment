import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Sidebar  from "./components/Sidebar";
import  Home  from "./pages/Home";

function App() {
  return (
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardlayout" element={<DashboardLayout />}/>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/" element={<Home />} />


        

        {/* Protected Routes */}
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="products" element={<Products />} />
        </Route> */}

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
  );
}

export default App;
