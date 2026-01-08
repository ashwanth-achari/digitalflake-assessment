import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const { API, token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handlers
  const handleChange = (e) => {
    setFormData({ name: e.target.value });
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  // validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!imageFile) {
      newErrors.image = "Category image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("status", "active"); // default
      payload.append("image", imageFile);

      const res = await fetch(`${API}/api/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Category creation failed");
      }

      toast.success("Category created successfully");
      navigate("/categories");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <img
          className="w-4 h-4 brightness-0 opacity-80 cursor-pointer"
          src="/src/assets/back-arrow.png"
          alt="back"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-semibold">Create Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-6 items-start">
        {/* Category Name */}
        <div className="flex flex-col gap-2 w-1/4">
          <label className="text-sm text-gray-600">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`border rounded-md px-3 py-2 focus:outline-none ${
              errors.name ? "border-red-500" : "border-[#E0E0E0]"
            }`}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">
              Upload Image <span className="text-red-500">*</span>
            </label>

            <div
              className={`border rounded-md p-3 w-30 h-30 flex items-center justify-center ${
                errors.image ? "border-red-500" : ""
              }`}
            >
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

            {errors.image && (
              <span className="text-xs text-red-500">{errors.image}</span>
            )}
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
              <span className="text-sm text-black">
                Upload Image
              </span>
              <span className="text-sm text-[#686464]">(Max Size: 2MB)</span>
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
          className="px-5 py-2 bg-[#662671] text-white rounded-md text-sm disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default CategoryCreate;
