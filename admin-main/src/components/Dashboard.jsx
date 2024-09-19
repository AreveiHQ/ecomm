import React from "react";

function DashboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3>Total Products</h3>
          <p>150</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3>Total Orders</h3>
          <p>200</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3>Total Users</h3>
          <p>50</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
