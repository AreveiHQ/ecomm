import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch orders when component loads
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/admin/orders"
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (orderId, itemId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/admin/orders/${orderId}/${itemId}`,
        {
          status: newStatus,
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orders: order.orders.map((item) =>
                  item._id === itemId
                    ? { ...item, orderStatus: newStatus }
                    : item
                ),
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <div className="adminOrders p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        All Order's
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order.orders.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2">{item.orderId}</td>
                  <td className="px-4 py-2">
                    {order.userId.name} ({order.userId.email})
                  </td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">{item.orderStatus}</td>
                  <td className="px-4 py-2">
                    <select
                      className="p-2 border border-gray-300 rounded"
                      value={item.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order._id, item._id, e.target.value)
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivering">Delivering</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
