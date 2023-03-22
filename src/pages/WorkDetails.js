import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchWorkDetails } from "../API/calls";
import Layout from "../components/Layout";
import workshops from "./WorkshopList";

const WorkDetails = () => {
  const [workDetails, setWorkDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    toast.promise(fetchWorkDetails(id), {
      loading: "Loading workshop details...",
      success: (res) => {
        console.log(res.data);
        setWorkDetails(res.data);
        return "Workshop details loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading workshop details";
      },
    });
  }, []);

  useEffect(() => {
    if (!workDetails) return;
    
  }, [workDetails]);

  return (
    <Layout title={`${workshops.find((work) => id === work.wid).workName} Registration Details`}>
      <div className="space-y-4 px-4 lg:px-0">
        <div className="flex flex-row items-center">
          <div className="text-xs mr-6 lg:mr-4 w-[5%]">S.No.</div>
          <div className="w-1/2">
            <p className="text-xs">Name</p>
            <p className="text-xs">College</p>
          </div>
          <div className="w-1/2 text-right">
            <p className="text-xs">Kriya ID</p>
            <p className="text-xs">Dept, Year</p>
            <p className="text-xs">Phone</p>
          </div>
        </div>
        <div className="border-b border-2 border-[#303030]"></div>
        {workDetails?.map((w, index) => {
          return (
            <div>
              <div className="flex items-center">
                <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
                <div className="w-1/2">
                  <p className="text-sm font-semibold">{w?.name} <span className="text-xs font-normal">({w?.email})</span></p>
                  <p className="text-xs">{w?.college}</p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-xs">{w?.kriyaId}</p>
                  <p className="text-xs">{w?.dept}, {w?.year}</p>
                  <button className="text-sm font-semibold" onClick={() => {window.open(`tel:${w?.phone}`)}}>{w?.phone}</button>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-500 my-2"></div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default WorkDetails;
