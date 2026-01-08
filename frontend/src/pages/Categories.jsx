import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthContext";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const { authorizationToken, API } = useAuth();

  //getting all the category data
  const getAllCategoryData = async () => {
    try {
      // setIsFetching(true);

      const URL = `${API}/api/categories`;
      const options = {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();

      console.log("category data", data);
      if (response.ok) {
        setCategories(data.categories || []);
        setLoading(false);
      } else {
        toast.error(
          data.extraDetails || data.message || "Failed to load contacts."
        );
        setCategories([]);
      }
    } catch (error) {
      console.log("Error fetching contacts:", error);
      toast.error("Something went wrong while loading contacts.");
      setCategories([]);
    } finally {
      // setIsFetching(false);
    }
  };

  //delete category by ID
  const deleteCategory = async (id) => {
    try {
      setDeletingId(id);

      const URL = `${API}/api/categories/${id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        toast.success("Category deleted successfully");
      } else {
        toast.error(data.message || "Category not deleted");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting category");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAllCategoryData();
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
          <Link to={`/categories/create`}>
          <button
            className="bg-[#662671] text-white px-4 py-2 rounded-md text-sm"
          >
            Add New
          </button>
          </Link>
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
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead className="bg-[#FFF8B7] text-md text-gray-700 ">
              <tr>
                <th className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-xl">
                    Id
                    <img
                      src="/src/assets/order-icon.png"
                      alt="order"
                      className="w-3 h-6"
                    />
                  </span>
                </th>

                <th className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-xl">
                    Category Name
                    <img
                      src="/src/assets/order-icon.png"
                      alt="order"
                      className="w-3 h-6"
                    />
                  </span>
                </th>
                <th className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-xl">
                    Image
                  </span>
                </th>
                <th className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-xl">
                    Status
                    <img
                      src="/src/assets/order-icon.png"
                      alt="order"
                      className="w-3 h-6"
                    />
                  </span>
                </th>
                <th className="px-4 py-4 text-center">
                  <span className="inline-flex items-center gap-2 text-xl">
                    Action
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="text-center">
              {filteredCategories.map((cat, index) => (
                <tr key={cat._id} className="text-sm bg-[#F2F2F2] ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="mx-auto w-10 h-10 object-cover rounded"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-md font-medium ${
                        cat.status === "active"
                          ? " text-[#00A11A]"
                          : " text-[#F70505]"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-4">
                      <Link to={`/categories/${cat._id}/`}>
                        <img
                          src="/src/assets/edit-icon.png"
                          alt="edit"
                          className="cursor-pointer"
                        />
                      </Link>
                      <Popup
                        trigger={
                          <img
                            src="/src/assets/delete-icon.png"
                            alt="delete"
                            className="w-5 h-5 cursor-pointer mx-auto"
                          />
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="bg-white p-6 rounded-lg w-110 text-center shadow-2xl">
                            <div className="flex justify-center gap-2">
                              <img
                                className="w-8 h-8"
                                src="/src/assets/delete-danger.png"
                                alt="danger"
                              />
                              <h3 className="text-lg font-extrabold mb-2">
                                Delete
                              </h3>
                            </div>
                            <p className="text-md text-gray-600 mb-6">
                              Are you sure you want to delete this category?
                            </p>

                            <div className="flex justify-center gap-4">
                              <button
                                onClick={close}
                                className="px-7 py-2 border border-[#767676] rounded-3xl text-md text-[#767676]"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={() => {
                                  deleteCategory(cat._id);
                                  close();
                                }}
                                className="px-7 py-2 bg-[#662671] text-white rounded-3xl text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
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
