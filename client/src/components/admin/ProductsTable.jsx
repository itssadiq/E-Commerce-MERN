import React, { useState } from "react";
import { Edit, Trash2, Plus, Loader } from "lucide-react";
import DeleteModal from "./DeleteModal";
import ProductFormModal from "./ProductFormModal";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation, // 1. Import Edit Hook
} from "../../services/product";

const ProductsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch Data
  const { data, isLoading, error } = useGetAllProductsQuery();
  const products = data?.products || [];

  // Initialize Mutation Hooks
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation(); // 2. Initialize Edit Hook

  // --- Handlers ---

  const handleAddClick = () => {
    setSelectedProduct(null); // Clear selection -> Add Mode
    setIsFormModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set selection -> Edit Mode
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // 3. Handle Submit (Add or Update)
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        // --- EDIT MODE ---
        await updateProduct({
          id: selectedProduct._id,
          ...formData,
        }).unwrap();
        alert("Product Updated Successfully!");
      } else {
        // --- ADD MODE ---
        await addProduct(formData).unwrap();
        alert("Product Added Successfully!");
      }
      setIsFormModalOpen(false);
      setSelectedProduct(null); // Reset selection
    } catch (err) {
      console.error("Failed to save product:", err);
      alert("Error saving product: " + (err?.data?.message || err.error));
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct._id).unwrap();
      alert("Product Deleted Successfully");
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Error deleting product: " + (err?.data?.message || err.error));
    }
  };

  // Combined Loading state for the Submit button
  const isSaving = isAdding || isUpdating;

  if (isLoading)
    return <div className="p-10 text-center">Loading products...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading products
      </div>
    );

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Product Management
          </h3>
          <button
            onClick={handleAddClick}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
          >
            {isAdding ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              <Plus size={16} className="mr-2" />
            )}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={
                            product.imageURL || "https://via.placeholder.com/40"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
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
        initialData={selectedProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={isDeleting ? "Deleting..." : "Delete Product"}
        message={
          isDeleting
            ? "Please wait..."
            : `Are you sure you want to delete "${selectedProduct?.name}"?`
        }
      />
    </>
  );
};

export default ProductsTable;
