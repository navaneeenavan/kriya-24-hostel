import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchReferralStats } from "../API/calls";
import Layout from "../components/Layout";
import referralList from "./ReferralList";

const ReferralLeaderboard = () => {
  const [referralStats, setReferralStats] = useState(null);

  useEffect(() => {
    toast.promise(fetchReferralStats(), {
      loading: "Loading referral stats...",
      success: (res) => {
        setReferralStats(res.data.referralStats);
        return "Referral stats loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading referral stats";
      },
    });
  }, []);


  return (
    <Layout title={"Referral Codes Leaderboard"}>
      <div className="space-y-4 px-4 lg:px-0">
        <div className="flex flex-row items-center">
          <div className="text-xs mr-6 lg:mr-4 w-[5%]">S.No.</div>
          <div className="w-3/4">
            <p className="text-xs">Referral Code</p>
            <p className="text-xs">Name</p>
          </div>
          <div className="text-xs text-center w-[15%]">Total Reg.</div>
          <div className="text-xs text-center w-[15%]">Paid Reg.</div>
        </div>
        <div className="border-b border-2 border-[#303030]"></div>
        {referralStats?.map((r, index) => {
          return (
            <div>
              <div className="flex items-center">
                <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
                <div className="w-3/4">
                  <p className="text-xs">{r._id}</p>
                  <p className="">{referralList.find((rr) => r._id === rr.code)?.name}</p>
                </div>
                <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{r.count}</div>
                <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{r.paidCount}</div>
              </div>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ReferralLeaderboard;
