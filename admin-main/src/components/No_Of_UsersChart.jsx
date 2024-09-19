import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { month: "Jan", number_Of_Users_Enrolled: 4000 },
//   { month: "Feb", number_Of_Users_Enrolled: 3000 },
//   { month: "Mar", number_Of_Users_Enrolled: 5000 },
//   { month: "Apr", number_Of_Users_Enrolled: 4780 },
//   { month: "May", number_Of_Users_Enrolled: 5890 },
//   { month: "Jun", number_Of_Users_Enrolled: 4390 },
//   { month: "Jul", number_Of_Users_Enrolled: 4490 },
//   { month: "Aug", number_Of_Users_Enrolled: 5490 },
//   { month: "Sep", number_Of_Users_Enrolled: 5490 },
//   { month: "Oct", number_Of_Users_Enrolled: 6490 },
//   { month: "Nov", number_Of_Users_Enrolled: 7490 },
//   { month: "Dec", number_Of_Users_Enrolled: 8490 },
// ];



function No_Of_UsersChart() {
  const [udata, setUData] = useState();

  useEffect(() => {
    // Fetch users when component loads
    const countUsersByMonth = async () => {
      try {
        const data = await axios.get(
          "http://localhost:3000/api/v1/admin/dashboard"
        );
        let demoObject=[{ month: "start", number_Of_Users_Enrolled: 0 }];
        let finalData=data.data;
        finalData.forEach(element => {
            let delement={ month: element.monthName, number_Of_Users_Enrolled: element.users.length };
          demoObject.push(delement);
        });
        // console.log(demoObject);
        setUData(demoObject);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    countUsersByMonth();
  }, []);


  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={udata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="number_Of_Users_Enrolled" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default No_Of_UsersChart;
