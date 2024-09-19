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

// const data = [
//   { category: "Electronics", products: 120 },
//   { category: "Clothing", products: 98 },
//   { category: "Home Appliances", products: 65 },
//   { category: "Books", products: 78 },
//   { category: "Toys", products: 90 },
//   { category: "Sports", products: 85 },
// ];

function ProductCategoryChart() {
  let [udata, setUData] = useState([]);
  let [finalData, setFinalData] = useState([
    { category: "Men", products: 0 },
    { category: "Women", products: 0 },
    { category: "Kids", products: 0 },
  ]);

  let [men, setMen] = useState(0);
  let [women, setWomen] = useState(0);
  let [kids, setKids] = useState(0);
  let categoryData = [];
  useEffect(() => {
    // Fetch orders when component loads
    const fetchOrders = async () => {
      try {
        const data = await axios.get(
          "http://localhost:3000/api/v1/admin/dashBoardAllOrders"
        );
        data.data.forEach(element => {
          // console.log(element.orders);
          element.orders.forEach(secElement => {
            // console.log(secElement.items[0].items);
            secElement.items[0].items.forEach(thirdElement => {
              // console.log(thirdElement.productId.category);
              if (thirdElement.productId != null) {
                // console.log(thirdElement.productId.category);
                categoryData.push(thirdElement.productId.category);
              }
            })
          });
        });
        setUData(categoryData);
        if (udata.length > 0) {
          categoryData.forEach(ecategory => {
            if (ecategory == "men") {
              setMen(men = men + 1);
            }
            if (ecategory == "kids") {
              setKids(kids = kids + 1);
            }
            if (ecategory == "women") {
              setWomen(women = women + 1);
            }
          });
          setFinalData([
              { category: "Men", products: men },
              { category: "Women", products: women },
              { category: "Kids", products: kids },
            ])
        }
        // console.log(categoryData);
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
