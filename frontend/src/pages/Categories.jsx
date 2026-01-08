import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMP: simulate API call
    setTimeout(() => {
      setCategories([]); // replace with API data later
      setLoading(false);
    }, 500);
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white ">
      <div className="flex justify-between p-6">
        <div className="flex items-center justify-between mb-6">
          <img
            className="w-6 mr-3.5"
            src="/src/assets/cat-icon.png"
            alt="category-logo"
          />
          <h1 className="text-xl text-gray-800 font-bold">Category</h1>
        </div>
        <div className="relative mb-4 w-160">
          <img
            src="/src/assets/search-icon.png"
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category"
            className="w-full border border-gray-400 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-purple-600"
          />
        </div>

        <div>
          <button
            onClick={() => console.log("Navigate to add category")}
            className="bg-[#662671] text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800"
          >
            Add New
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No categories found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Category Name</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={cat._id} className="border-t text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2">IMG</td>
                  <td className="px-4 py-2">{cat.status}</td>
                  <td className="px-4 py-2">
                    <span className="text-blue-600 cursor-pointer mr-3">
                      Edit
                    </span>
                    <span className="text-red-600 cursor-pointer">Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Categories;
