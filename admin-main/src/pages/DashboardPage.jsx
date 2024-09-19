import React from "react";
import No_Of_UsersChart from "../components/No_Of_UsersChart";
import ProductCategoryChart from "../components/ProductCategoryChart";

function DashboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-medium mb-4">Monthly Enrollment of Users</h3>
          <No_Of_UsersChart />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-medium mb-4">Orders by Category</h3>
          <ProductCategoryChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
