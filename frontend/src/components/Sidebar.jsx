import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex h-\[902px]\ bg-[#F2F2F2]">
      <aside className="w-64 bg-[#F2F2F2]">
        <nav className="py-6 space-y-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-[#F4EDAF] text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/home -icon 1.png"
              alt="home"
              className="h-6 w-6 object-contain"
            />
            <span className="text-xl ml-2">Home</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-[#F4EDAF] text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/cat-icon.png"
              alt="home"
              className="h-6 w-6 object-contain"
            />
            <span className="text-xl ml-2">Category</span>
          </NavLink>
          <NavLink
            to="/subcategories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-[#F4EDAF] text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/sub-cat-icon.png"
              alt="home"
              className="h-6 w-6 object-contain"
            />
            <span className="text-xl ml-2">Sub Category</span>
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-[#F4EDAF] text-black"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <img
              src="/src/assets/pro-icon.png"
              alt="home"
              className="h-6 w-6 object-contain"
            />
            <span className="text-xl ml-2">Products</span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
