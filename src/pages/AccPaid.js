import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import {
  fetchAccPaid,
  fetchUpdateAccommodation,
} from "../API/calls";

const AccPaid = () => {
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [room, setRoom] = useState(null);
  const [idf, setIdf] = useState(null);
  const [namef, setNamef] = useState(null);
  const [roomf, setRoomf] = useState(null);

  useEffect(() => {
    toast.promise(
      fetchAccPaid(),
      {
        loading: "Fetching Details",
        success: (res) => {
          setMale(res.data.malePaid);
          setFemale(res.data.femalePaid);
          return "Details Fetched";
        },
      },
      {
        error: "Error Fetching Details",
      }
    );
  }, []);

  const handleCheckbox = (email) => {
    toast.promise(fetchUpdateAccommodation(email, { vacated: true }), {
      loading: "Updating Details",
      success: (res) => {
        console.log(res.data);
      }
    }, {
      error: "Error Updating Details"
    });
  }

  return (
    <Layout title={"Accommodation Paid Users"} className={"space-y-6"}>
     <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button
          className={`px-6 py-2 rounded-full ${
            id ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setId(true);
            setRoom(false);
            setName(false);
            let temp = male;
            temp.sort((a, b) => a.kriyaId.localeCompare(b.kriyaId));
            setMale(temp);
          }}
        >
          Kriya ID
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            name ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setId(false);
            setRoom(false);
            setName(true);
            let temp = [...male];
            temp.sort((a, b) => a.name.localeCompare(b.name));
            setMale(temp);
          }}
        >
          Name
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            room ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setRoom(true);
            setId(false);
            setName(false);
            let temp = male;
            temp.sort((a, b) => a.room.localeCompare(b.room));
            setMale(temp);
          }}
        >
          Room
        </button>
      </div>
      <div className={""}>
        <p className="text-2xl font-bold pb-4">Boys</p>
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p className="hidden lg:block w-[20%] font-semibold">Room Type</p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Room</p>
          <p className="hidden lg:block w-[5%] font-semibold">Vacated</p>
        </div>
        {male &&
          male.map((item, index) => (
            <div className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">{item.days} {item.days === 1 ? "Day" : "Days"}</p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">
                {item.breakfast1 +
                  item.breakfast2 +
                  item.breakfast3 +
                  item.lunch1+
                  item.lunch2+
                  item.lunch3+
                  item.dinner1 +
                  item.dinner2}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">
                Rs. {item.amount}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
              <input type="checkbox" className="hidden lg:block w-[5%]" checked={item.vacated } onClick={() => {
                const updatedList = male.map((up) => {
                  if (up.email === item.email) {
                    return { ...up, vacated: true }
                  }
                  return { ...up };
                })
                setMale(updatedList);
                handleCheckbox(item.email)
              }} />
            </div>
          ))}
        {male && (
          <p className="text-lg mt-2">
            Total Payment Rs.{" "}
            {male.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.amount),
              0
            )}
          </p>
        )}
      </div>

      

      <div className={"pt-16"}>
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full justify-around items-center pb-12">
        <div className="">Sort by</div>
        <button
          className={`px-6 py-2 rounded-full ${
            idf ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setIdf(true);
            setRoomf(false);
            setNamef(false);
            let temp = female;
            temp.sort((a, b) => a.kriyaId.localeCompare(b.kriyaId));
            setFemale(temp);
          }}
        >
          Kriya ID
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            namef ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setIdf(false);
            setRoomf(false);
            setNamef(true);
            let temp = [...female];
            temp.sort((a, b) => a.name.localeCompare(b.name));
            setFemale(temp);
          }}
        >
          Name
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            roomf ? "bg-[#3c3c3c] text-white" : "bg-[#eaeaea] text-[#303030]"
          } border-2 border-[#303030]`}
          onClick={() => {
            setRoomf(true);
            setIdf(false);
            setNamef(false);
            let temp = female;
            temp.sort((a, b) => a.room.localeCompare(b.room));
            setFemale(temp);
          }}
        >
          Room
        </button>
      </div>
      
        <p className="text-2xl font-bold pb-4">Girl</p>
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p className="hidden lg:block w-[20%] font-semibold">Room Type</p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Room</p>
          <p className="hidden lg:block w-[5%] font-semibold">Vacated</p>
        </div>
        {female &&
          female.map((item, index) => (
            <div className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[20%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">{item.days} {item.days === 1 ? "Day" : "Days"}</p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">{item.breakfast1 + item.breakfast2 + item.breakfast3 + item.lunch1 + item.lunch2 + item.lunch3 + item.dinner1 + item.dinner2}</p>
              <p className="w-[20%] lg:w-[10%] font-semibold">Rs. {item.amount}</p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
              <input type="checkbox" className="hidden lg:block w-[5%]" checked={item.vacated} onClick={() => {
                const updatedList = female.map((up) => {
                  if (up.email === item.email) {
                    return { ...up, vacated: true }
                  }
                  return { ...up };
                })
                setFemale(updatedList);
                handleCheckbox(item.email)
              }} />
            </div>
          ))}
        {female && (
          <p className="text-lg mt-2">
            Total Payment Rs.{" "}
            {female.reduce(
              (accumulator, currentValue) =>
                accumulator + Number(currentValue.amount),
              0
            )}
          </p>
        )}
      </div>
    </Layout>
  );
};

export default AccPaid;