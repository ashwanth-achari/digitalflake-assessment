import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API, token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //get category by Id
  const fetchCategory = async () => {
    try {
      const res = await fetch(`${API}/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load category");
      }

      setFormData({
        name: data.name,
        status: data.status,
      });

      setPreview(data.image); // existing image URL
    } catch (err) {
      toast.error(err.message);
      navigate("/categories");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  //handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("status", formData.status);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const res = await fetch(`${API}/api/categories/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Category updated successfully");
      navigate("/categories");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-start items-center gap-2 mb-8">
        <img
          className="w-4 h-4 font-bold brightness-0 opacity-80"
          src="/src/assets/back-arrow.png"
          alt="back"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold">Edit Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-6 items-start">
        {/* Category Name */}
        <div className="flex flex-col gap-2 w-1/4">
          <label className="text-sm text-gray-600">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-[#E0E0E0] rounded-md px-3 py-2 focus:outline-none focus:border-black"
          />
        </div>
        {/* Image Upload */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Upload Image</label>
            <div className="border rounded-md p-3 w-30 h-30 flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="object-contain h-full"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center h-40">
            <label
              htmlFor="categoryImage"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <img
                src="/src/assets/upload-icon.png"
                alt="upload"
                className="w-10 h-10"
              />
              <span className="text-sm text-purple-700">Upload Image</span>
            </label>
            <input
              id="categoryImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        {/* Status */}
        <div className="flex flex-col gap-2 w-1/4">
          <label className="text-sm text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </form>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-5 py-2 bg-[#662671] text-white rounded-md text-sm "
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CategoryEdit;
