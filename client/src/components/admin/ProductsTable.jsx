import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import DeleteModal from "./DeleteModal";
import ProductFormModal from "./ProductFormModal"; // Import the updated modal

const ProductsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // State to hold the product being edited (null if adding new)
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dummy Data
  const products = [
    {
      _id: "1",
      name: "Sony Headphones",
      price: 349,
      category: "Electronics",
      inStock: true,
      description: "Great sound",
      imageURL: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      name: "MacBook Air",
      price: 1099,
      category: "Computers",
      inStock: true,
      description: "Fast laptop",
      imageURL: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      name: "Canon Camera",
      price: 679,
      category: "Cameras",
      inStock: false,
      description: "Clear photos",
      imageURL: "https://via.placeholder.com/150",
    },
  ];

  // --- Handlers ---

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting product:", selectedProduct._id);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddClick = () => {
    setSelectedProduct(null); // Ensure we are in "Add" mode
    setIsFormModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set data for "Edit" mode
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (selectedProduct) {
      console.log("Update Existing Product:", selectedProduct._id, formData);
    } else {
      console.log("Create New Product:", formData);
    }
    setIsFormModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Product Management
          </h3>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.inStock ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedProduct} // Pass data if editing
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
      />
    </>
  );
};

export default ProductsTable;
