import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-yellow-100 text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/home -icon 1.png"
              alt="home"
              className="h-4 w-4 object-contain"
            />
            <span>Home</span>
          </NavLink>

           <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-yellow-100 text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/cat-icon.png"
              alt="home"
              className="h-4 w-4 object-contain"
            />
            <span>Categories</span>
          </NavLink>
           <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-yellow-100 text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/sub-cat-icon.png"
              alt="home"
              className="h-4 w-4 object-contain"
            />
            <span>Sub Categories</span>
          </NavLink>
           <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-yellow-100 text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/pro-icon.png"
              alt="home"
              className="h-4 w-4 object-contain"
            />
            <span>Product</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
