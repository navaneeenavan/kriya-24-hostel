import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchPaperStats } from "../API/calls";
import Layout from "../components/Layout";
import papers from "./PaperList";

const PaperReg = () => {
  const [paperStats, setPaperStats] = useState(null);
  const [registrations, setRegistrations] = useState(false);
  const [paperID, setPaperID] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    toast.promise(fetchPaperStats(), {
      loading: "Loading paper statistics...",
      success: (res) => {
        setPaperStats(res.data?.paperWiseCount);
        return "Paper statistics loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading paper statistics";
      },
    });
  }, []);

  return (
    <Layout title={"Paper Presentation Registrations"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button className={`px-6 py-2 rounded-full ${paperID ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setPaperID(true);
            setRegistrations(false);

            let temp = paperStats;
            temp.sort((a, b) => a._id.localeCompare(b._id));
            setPaperStats(temp);
          }}
        >
          Paper ID
        </button>
        <button className={`px-6 py-2 rounded-full ${registrations ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setPaperID(false);
            setRegistrations(true);

            let temp = paperStats;
            temp.sort((a, b) => b.count - a.count);
            setPaperStats(temp);
          }}
        >
          Registrations
        </button>
      </div>
      <div className="space-y-4 px-4 lg:px-0">
        <div className="flex flex-row items-center">
          <div className="text-xs mr-6 lg:mr-4 w-[5%]">S.No.</div>
          <div className="w-1/2">
            <p className="text-xs">Paper ID</p>
            <p className="text-xs">Paper Name</p>
          </div>
          <div className="text-xs text-center w-[15%]">Total Reg.</div>
          <div className="text-xs text-center w-[15%]">PSG Reg.</div>
          <div className="text-xs text-center w-[15%]">Non PSG Reg.</div>
        </div>
        <div className="border-b border-2 border-[#303030]"></div>
        {paperStats?.map((p, index) => {
          return (
            <div>
              <div className="flex items-center">
                <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
                <button className="w-1/2 flex flex-col text-left"
                  onClick={() => {
                    navigate(`/paper-details/${p._id}`);
                  }}
                >
                  <p className="text-xs">{p._id}</p>
                  <p className="">{papers.find((paper) => p._id === paper.ppid).paperName}</p>
                </button>
                <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{p.count}</div>
                <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{p.psgCount}</div>
                <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{p.count - p.psgCount}</div>
              </div>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default PaperReg;
