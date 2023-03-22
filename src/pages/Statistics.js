import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchStatistics } from "../API/calls";
import { toast } from "react-hot-toast";
import Row from "../components/Row";

const Statistics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    toast.promise(fetchStatistics(), {
      loading: "Loading statistics...",
      success: (res) => {
        setStats(res.data);
        return "Statistics loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading statistics";
      },
    });
  }, []);

  return (
    <Layout title={"Statistics"} className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 justify-center items-center">
      <Component title="Total Users" value={stats?.userCount} />
      <Component title="Total PSG Users" value={stats?.psgUserCount} />
      <Component title="Total Non-PSG Users" value={stats?.userCount - stats?.psgUserCount} />
      <Component title="Paid Users" value={stats?.paidUserCount} />
      <Component title="Paid PSG Users" value={stats?.paidPsgUserCount} />
      <Component title="Paid Non-PSG Users" value={stats?.paidUserCount - stats?.paidPsgUserCount} />
      <Component title="Total Events Registrations" value={stats?.totalEventCount} />
      <Component title="PSG Events Registrations" value={stats?.psgEventCount} />
      <Component title="Non-PSG Events Registrations" value={stats?.totalEventCount - stats?.psgEventCount} />
      <Component title="Total Workshops Registrations" value={stats?.totalWorkshopCount} />
      <Component title="PSG Workshops Registrations" value={stats?.psgWorkshopCount} />
      <Component title="Non-PSG Workshops Registrations" value={stats?.totalWorkshopCount - stats?.psgWorkshopCount} />
      <Component title="Total Paper Registrations" value={stats?.totalPaperCount} />
      <Component title="PSG Paper Registrations" value={stats?.psgPaperCount} />
      <Component title="Non-PSG Paper Registrations" value={stats?.totalPaperCount - stats?.psgPaperCount} />
      <Component title="Accommodation Count" value={stats?.accommodationCount} />
      <Component title="Total Referrals" value={stats?.referralCount} />
    </Layout>
  );
};

const Component = ({ title, value }) => {
  return (
    <div className="w-full text-center lg:text-left space-y-2">
      <h1 className="text-lg">{title}</h1>
      <p className="text-5xl font-semibold">{value}</p>
    </div>
  )
}

export default Statistics;
