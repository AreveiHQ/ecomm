import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const server = import.meta.env.VITE_BACKEND_SERVER;

function ProductCategoryChart() {
  const [finalData, setFinalData] = useState([
    { category: "Men", products: 0 },
    { category: "Women", products: 0 },
    { category: "Kids", products: 0 },
  ]);

  useEffect(() => {
    // Fetch orders when component loads
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${server}/v1/admin/dashBoardAllOrders`);
        const categoryCounts = { men: 0, women: 0, kids: 0 };
        
        response.data.forEach(order => {
          order.orders.forEach(subOrder => {
            subOrder.items[0].items.forEach(item => {
              const category = item.productId?.category;
              if (category && categoryCounts[category] !== undefined) {
                categoryCounts[category] += 1;
              }
            });
          });
        });

        // Update finalData state
        setFinalData([
          { category: "Men", products: categoryCounts.men },
          { category: "Women", products: categoryCounts.women },
          { category: "Kids", products: categoryCounts.kids },
        ]);

      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={finalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="products" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProductCategoryChart;
