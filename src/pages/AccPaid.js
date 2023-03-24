import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import {
  fetchAccommodationDetailsbyEmail,
  fetchAccommodationDetailsbyKriyaId,
  fetchAccPaid,
  fetchUpdateAccommodation,
} from "../API/calls";

const AccPaid = () => {
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);

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

  return (
    <Layout title={"Accommodation Paid Users"} className={"space-y-6"}>
      <div className={""}>
        <p className="text-2xl font-bold pb-4">Boys</p>
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p className="hidden lg:block w-[25%] font-semibold">Room Type</p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Room</p>
        </div>
        {male &&
          male.map((item, index) => (
            <div className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[25%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">
                {item.days} {item.days === 1 ? "Day" : "Days"}
              </p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">
                {item.breakfast1 +
                  item.breakfast2 +
                  item.breakfast3 +
                  item.dinner1 +
                  item.dinner2 +
                  item.dinner3}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">
                Rs. {item.amount}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
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
        <p className="text-2xl font-bold pb-4">Girls</p>
        <div className="flex flex-row text-center">
          <p className="w-[10%] lg:w-[5%] font-semibold">No.</p>
          <p className="w-[50%] lg:w-[20%] font-semibold">Name</p>
          <p className="hidden lg:block w-[10%] font-semibold">Kriya Id</p>
          <p className="hidden lg:block w-[25%] font-semibold">Room Type</p>
          <p className="hidden lg:block w-[10%] font-semibold">Days</p>
          <p className="hidden lg:block w-[10%] font-semibold">Amenities</p>
          <p className="hidden lg:block w-[10%] font-semibold">Meals</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Amount</p>
          <p className="w-[20%] lg:w-[10%] font-semibold">Room</p>
        </div>
        {female &&
          female.map((item, index) => (
            <div className="flex flex-row text-sm text-center py-2 border-b border-gray-500">
              <p className="w-[10%] lg:w-[5%]">{index + 1}.</p>
              <p className="w-[50%] lg:w-[20%]">{item.name}</p>
              <p className="hidden lg:block w-[10%]">{item.kriyaId}</p>
              <p className="hidden lg:block w-[25%] px-2">{item.roomType}</p>
              <p className="hidden lg:block w-[10%] font-semibold">
                {item.days} {item.days === 1 ? "Day" : "Days"}
              </p>
              <p className="hidden lg:block w-[10%]">{item.amenities}</p>
              <p className="hidden lg:block w-[10%]">
                {item.breakfast1 +
                  item.breakfast2 +
                  item.breakfast3 +
                  item.dinner1 +
                  item.dinner2 +
                  item.dinner3}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">
                Rs. {item.amount}
              </p>
              <p className="w-[20%] lg:w-[10%] font-semibold">{item.room}</p>
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
