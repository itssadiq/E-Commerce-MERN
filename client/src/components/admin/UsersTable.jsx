import React, { useState } from "react";
import { Edit, Trash2, ShieldAlert, ShieldCheck } from "lucide-react";
import DeleteModal from "./DeleteModal";
import UserEditModal from "./UserEditModal";
// 1. Import Hooks
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../services/user";

const UsersTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 2. Fetch Users
  // Note: Backend returns { users: [...] }
  const { data, isLoading, error } = useGetAllUsersQuery();
  const users = data?.users || [];

  // 3. Initialize Mutations
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // --- Handlers ---
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id).unwrap();
      alert("User deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Error deleting user");
    }
  };

  const handleEditSubmit = async (formData) => {
    if (!selectedUser) return;
    try {
      await updateUser({
        id: selectedUser._id,
        ...formData,
      }).unwrap();
      alert("User updated successfully");
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Error updating user");
    }
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading users...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error loading users (Are you Super Admin?)
      </div>
    );

  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            User Management
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isSuperAdmin ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <ShieldAlert size={12} className="mr-1" /> Super Admin
                      </span>
                    ) : user.isAdmin ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        <ShieldCheck size={12} className="mr-1" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        User
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit size={18} />
                    </button>
                    {/* Prevent deleting yourself or other Super Admins (optional UI safety) */}
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
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

      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedUser}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={isDeleting ? "Deleting..." : "Delete User"}
        message={
          isDeleting
            ? "Please wait..."
            : `Are you sure you want to delete "${selectedUser?.name}"?`
        }
      />
    </>
  );
};

export default UsersTable;
