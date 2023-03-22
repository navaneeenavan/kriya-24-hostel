import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { fetchEventDetails } from "../API/calls";
import Layout from "../components/Layout";
import events from "./EventList";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    toast.promise(fetchEventDetails(id), {
      loading: "Loading event details...",
      success: (res) => {
        setEventDetails(res.data);
        return "Event details loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading event details";
      },
    });
  }, []);

  useEffect(() => {
    if (!eventDetails) return;
    
  }, [eventDetails]);

  return (
    <Layout title={`${events.find((event) => id === event.eventId).eventName} Registration Details`}>
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
        {eventDetails?.map((e, index) => {
          return (
            <div>
              <div className="flex items-center">
                <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
                <div className="w-1/2">
                  <p className="text-sm font-semibold">{e?.name}</p>
                  <p className="text-xs">{e?.college}</p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-xs">{e?.kriyaId}</p>
                  <p className="text-xs">{e?.dept}, {e?.year}</p>
                  <button className="text-sm font-semibold" onClick={() => {window.open(`tel:${e?.phone}`)}}>{e?.phone}</button>
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

export default EventDetails;
