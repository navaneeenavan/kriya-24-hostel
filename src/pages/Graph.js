import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
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
import { toast } from "react-hot-toast";
import { fetchGraphData } from "../API/calls";

const Graph = () => {
  const [totalData, setTotalData] = useState(null);
  const [paidData, setPaidData] = useState(null);

  useEffect(() => {
    toast.promise(fetchGraphData(1), {
      loading: "Loading...",
      success: (data) => {
        console.log(data.data);
        setTotalData(
          data.data.totalData.map((item) => ({
            ...item,
            _id: new Date(item._id).toLocaleString(),
          }))
        );
        setPaidData(
          data.data.paidData.map((item) => ({
            ...item,
            _id: new Date(item._id).toLocaleString(),
          }))
        );
        return "Loaded!";
      },
      error: (err) => {
        console.log(err);
        return "Error!";
      },
    });
  }, []);

  return (
    <Layout title={"Graphs"}>
      <div className="w-full">
        <h1 className="font-poppins text-2xl font-semibold my-8">
          For Total Registrations
        </h1>
        {totalData ? (
          <LineChart
            width={
              Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
              ) / 2.5
            }
            height={600}
            data={totalData}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="_id" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#82ca9d" /> */}
          </LineChart>
        ) : (
          <h1>Loading...</h1>
        )}
        <h1 className="font-poppins text-2xl font-semibold my-8">
          For Paid Registrations
        </h1>

        {paidData ? (
          <LineChart
            width={
              Math.max(
                document.documentElement.clientWidth || 0,
                window.innerWidth || 0
              ) / 2.5
            }
            height={600}
            data={paidData}
            margin={{
              top: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="_id" />
            <YAxis dataKey="count" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="amt" stroke="#82ca9d" /> */}
          </LineChart>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </Layout>
  );
};

export default Graph;
