import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchCollegeStats } from "../API/calls";
import Layout from "../components/Layout";
import workshops from "./WorkshopList";

const CollegeUsers = () => {
  const [collegeStats, setCollegeStats] = useState(null);
  const [paidCollegeStats, setPaidCollegeStats] = useState(null);
  const [currentView, setCurrentView] = useState(null)
  const [registrations, setRegistrations] = useState(true);
  const [alphabetically, setAlphabetically] = useState(false);
  const [paidFilter, setPaidFilter] = useState(false);
  const [allFilter, setAllFilter] = useState(true);

  useEffect(() => {
    toast.promise(fetchCollegeStats(), {
      loading: "Loading colege statistics...",
      success: (res) => {
        setCollegeStats(res.data?.collegeWiseCount);
        setPaidCollegeStats(res.data?.paidCollegeWiseCount);
        setCurrentView(res.data?.collegeWiseCount);
        return "College statistics loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading college statistics";
      },
    });
  }, []);

  return (
    <Layout title={"College Wise Registrations"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Filter</div>
        <button className={`px-6 py-2 rounded-full ${paidFilter ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setPaidFilter(true);
            setAllFilter(false);
            setCurrentView(paidCollegeStats);
          }}
        >
          Paid Users
        </button>
        <button className={`px-6 py-2 rounded-full ${allFilter ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setPaidFilter(false);
            setAllFilter(true);
            setCurrentView(collegeStats);
          }}
        >
          All Users
        </button>
      </div>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button className={`px-6 py-2 rounded-full ${alphabetically ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setAlphabetically(true);
            setRegistrations(false);

            let temp = currentView;
            temp.sort((a, b) => a._id.localeCompare(b._id));
            setCurrentView(temp);
          }}
        >
          Alphabetically
        </button>
        <button className={`px-6 py-2 rounded-full ${registrations ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setAlphabetically(false);
            setRegistrations(true);

            let temp = currentView;
            temp.sort((a, b) => b.count - a.count);
            setCurrentView(temp);
          }}
        >
          Registrations
        </button>
      </div>
      <div className="space-y-4 px-4 lg:px-0">
        {currentView?.map((c, index) => (
          <div>
            <div className="flex items-center">
              <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
              <div className="w-3/4">
                <p className="">{c._id}</p>
              </div>
              <div className="text-3xl lg:text-4xl text-right font-semibold w-[15%]">{c.count}</div>
            </div>
            <div className="w-full h-[1px] bg-gray-500 my-2"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CollegeUsers;
