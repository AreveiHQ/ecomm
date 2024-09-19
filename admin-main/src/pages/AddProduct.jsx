import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subCategories = {
  men: ["shirts", "trousers", "shoes"],
  women: ["dresses", "handbags", "shoes"],
  kids: ["toys", "clothing", "shoes"],
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    brand: "",
    sizes: "",
    colors: "",
    images: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...formData,
        sizes: formData.sizes.split(",").map((size) => size.trim()), // Convert to array
        colors: formData.colors.split(",").map((color) => color.trim()), // Convert to array
        images: formData.images.split(",").map((image) => image.trim()), // Convert to array
        stock: parseInt(formData.stock, 10) || 0, // Convert stock to number
        price: parseFloat(formData.price), // Convert price to number
      };

      await axios.post(
        "http://localhost:3000/api/v1/admin/products/add",
        newProduct
      );
      toast.success("Product added successfully");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        brand: "",
        sizes: "",
        colors: "",
        images: "",
        stock: "",
      }); // Reset form after success
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  const availableSubCategories = subCategories[formData.category] || [];

  return (
    <div className="container mx-auto mt-5 p-6 bg-gray-100 rounded shadow ">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">SubCategory:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={!formData.category} // Disable if no category is selected
          >
            <option value="">Select SubCategory</option>
            {availableSubCategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Sizes (comma-separated):
          </label>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Colors (comma-separated):
          </label>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Images (comma-separated URLs):
          </label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
