import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchEventStats } from "../API/calls";
import Layout from "../components/Layout";
import events from "./EventList";

const EventReg = () => {
  const [eventStats, setEventStats] = useState(null);
  const [eventID, setEventID] = useState(true);
  const [registrations, setRegistrations] = useState(false);
  const [category, setCategory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    toast.promise(fetchEventStats(), {
      loading: "Loading event statistics...",
      success: (res) => {
        setEventStats(res.data?.eventWiseCount);
        return "Event statistics loaded";
      },
      error: (err) => {
        console.log(err);
        return "Error loading event statistics";
      },
    });
  }, []);

  return (
    <Layout title={"Event Registrations"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button className={`px-6 py-2 rounded-full ${eventID ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setEventID(true);
            setRegistrations(false);
            setCategory(false);

            let temp = eventStats;
            temp.sort((a, b) => a._id.localeCompare(b._id));
            setEventStats(temp);
          }}
        >
          Event ID
        </button>
        <button className={`px-6 py-2 rounded-full ${registrations ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setEventID(false);
            setRegistrations(true);
            setCategory(false);

            let temp = eventStats;
            temp.sort((a, b) => b.count - a.count);
            setEventStats(temp);
          }}
        >
          Registrations
        </button>
        <button className={`px-6 py-2 rounded-full ${category ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"} border-2 border-[#303030]`}
          onClick={() => {
            setEventID(false);
            setRegistrations(false);
            setCategory(true);

            let temp = eventStats;
            temp.sort((a, b) => events.find((ev) => a._id === ev.eventId).category.localeCompare(events.find((ev) => b._id === ev.eventId).category));
            setEventStats(temp);
          }}
        >
          Category
        </button>
      </div>
      <div className="space-y-4 px-4 lg:px-0">
        <div className="flex flex-row items-center">
          <div className="text-xs mr-6 lg:mr-4 w-[5%]">S.No.</div>
          <div className="w-1/2">
            <p className="text-xs">Event ID - Category</p>
            <p className="text-xs">Event Name</p>
          </div>
          <div className="text-xs text-center w-[15%]">Total Reg.</div>
          <div className="text-xs text-center w-[15%]">PSG Reg.</div>
          <div className="text-xs text-center w-[15%]">Non PSG Reg.</div>
        </div>
        <div className="border-b border-2 border-[#303030]"></div>

        {eventStats?.map((e, index) => (
          <div>
            <div className="flex flex-row items-center">
              <div className="text-xl mr-6 lg:mr-4 w-[5%]">{index + 1}</div>
              <button className="w-1/2 flex flex-col text-left"
                onClick={() => {
                  navigate(`/event-details/${e._id}`);
                }}
              >
                <p className="text-xs">{e._id} - {events.find((ev) => e._id === ev.eventId).category}</p>
                <p className="">
                  {events.find((ev) => e._id === ev.eventId).eventName}
                </p>
              </button>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{e.count}</div>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{e.psgCount}</div>
              <div className="text-3xl lg:text-4xl text-center font-semibold w-[15%]">{e.count - e.psgCount}</div>
            </div>
            <div className="w-full h-[1px] bg-gray-500 my-2"></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default EventReg;