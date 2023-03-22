import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchWorkshopStats } from "../API/calls";
import Layout from "../components/Layout";
import workshops from "./WorkshopList";

const WorkshopReg = () => {
  const [workStats, setWorkStats] = useState(null);
  const [registrations, setRegistrations] = useState(false);
  const [workID, setWorkID] = useState(true);
  const [percentage, setPercentage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    toast.promise(fetchWorkshopStats(), {
      loading: "Loading workshop statistics...",
      success: (res) => {
        setWorkStats(res.data?.workshopWiseCount);
        return "Workshop statistics loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading workshop statistics";
      },
    });
  }, []);

  return (
    <Layout title={"Workshop Registrations"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button className={`px-6 py-2 rounded-full ${workID ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setWorkID(true);
            setRegistrations(false);
            setPercentage(false);

            let temp = workStats;
            temp.sort((a, b) => a._id.localeCompare(b._id));
            setWorkStats(temp);
          }}
        >
          Workshop ID
        </button>
        <button className={`px-6 py-2 rounded-full ${registrations ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setWorkID(false);
            setRegistrations(true);
            setPercentage(false);

            let temp = workStats;
            temp.sort((a, b) => b.count - a.count);
            setWorkStats(temp);
          }}
        >
          Registrations
        </button>
        <button className={`hidden lg:block px-6 py-2 rounded-full ${percentage ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setWorkID(false);
            setRegistrations(false);
            setPercentage(true);

            let temp = workStats;
            temp.sort((a, b) => ((b.count)/(workshops.find((work) => b._id === work.wid).maxCount)) - ((a.count)/(workshops.find((work) => a._id === work.wid).maxCount)));
            setWorkStats(temp);
          }}
        >
          Percentage
        </button>
      </div>
      <div className="space-y-4 px-4 lg:px-0">
        <div className="flex flex-row items-center">
          <div className="text-xs mr-6 lg:mr-4 w-[5%]">S.No.</div>
          <div className="w-1/2">
            <p className="text-xs">Workshop ID</p>
            <p className="text-xs">Workshop Name</p>
          </div>
          <div className="text-xs text-center w-[15%]">Total Reg.</div>
          <div className="hidden lg:flex flex-col items-center justify-center w-[15%]">
            <div className="text-xs text-center">Max Count</div>
            <div className="text-xs text-center">Percentage</div>
          </div>
          <div className="text-xs text-center w-[15%]">PSG Reg.</div>
          <div className="text-xs text-center w-[15%]">Non PSG Reg.</div>
        </div>
        <div className="border-b border-2 border-[#303030]"></div>

        {workStats?.map((w, index) => (
          <div>
            <div className="flex items-center">
              <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
              <button className="w-1/2 flex flex-col text-left"
                onClick={() => {
                  navigate(`/work-details/${w._id}`);
                }}
              >
                <p className="text-xs">{w._id}</p>
                <p className="">
                  {workshops.find((work) => w._id === work.wid).workName}
                </p>
              </button>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{w.count}</div>
              <div className="hidden lg:flex flex-row items-end justify-center w-[15%] space-x-1">
                <div className="text-2xl text-center font-semibold">{workshops.find((work) => w._id === work.wid).maxCount}</div>
                <div className="text-sm text-center">{(((w.count) / (workshops.find((work) => w._id === work.wid).maxCount)) * 100).toPrecision(3)}%</div>
              </div>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{w.psgCount}</div>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{w.count - w.psgCount}</div>
            </div>
            <div className="w-full h-[1px] bg-gray-500 my-2"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default WorkshopReg;
