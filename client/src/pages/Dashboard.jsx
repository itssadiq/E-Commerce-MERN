import React, { useState } from "react";
import { Package, Users, LogOut, LayoutDashboard } from "lucide-react";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";

// import { useSelector } from 'react-redux'; // TODO: Uncomment for real logic

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  // TODO: Get real user info from Redux
  // const { userInfo } = useSelector((state) => state.auth);
  const userInfo = { name: "Admin User", isSuperAdmin: true }; // Dummy data for testing

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">AdminPanel</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "products"
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Package className="mr-3 h-5 w-5" />
            Products
          </button>

          {/* Only show Users tab if Super Admin */}
          {userInfo.isSuperAdmin && (
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Users
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {userInfo.name}
              </p>
              <p className="text-xs text-gray-500">
                {userInfo.isSuperAdmin ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:hidden mb-6">
            {/* Mobile Tab Switcher (Simple Select for mobile) */}
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="products">Manage Products</option>
              {userInfo.isSuperAdmin && (
                <option value="users">Manage Users</option>
              )}
            </select>
          </div>

          {activeTab === "products" ? <ProductsTable /> : <UsersTable />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
