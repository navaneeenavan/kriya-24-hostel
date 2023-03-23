import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccommodationDetailsbyKriyaId, fetchAccPaid, fetchUpdateAccommodation } from "../API/calls";

const AccPaid = () => {
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);

  useEffect(() => {
    toast.promise(fetchAccPaid(), {
      loading: "Fetching Details",
      success: (res) => {
        setMale(res.data.malePaid);
        setFemale(res.data.femalePaid);
        return "Details Fetched";
      }
    }, {
      error: "Error Fetching Details"
    });
  }, []);

  return (
    <Layout title={"Accommodation Paid Users"} className={"space-y-6"}>
      {
        male && male.map((item, index) => (
          <div className={"bg-white p-4 rounded-md shadow-md"}>
            <p className="text-2xl font-bold pb-4">Boys</p>
            <div className="flex flex-row">
              <p className="pr-2">{index + 1}.</p>
              <p className="">{item.name}</p>
              <p className="font-semibold ml-auto">{item.room}</p>
            </div>
          </div>
        ))
      }

      {
        female && female.map((item, index) => (
          <div className={"bg-white p-4 rounded-md shadow-md"}>
            <p className="text-2xl font-bold pb-4">Girls</p>
            <div className="flex flex-row">
              <p className="pr-2">{index + 1}.</p>
              <p className="">{item.name}</p>
              <p className="font-semibold ml-auto">{item.room}</p>
            </div>
          </div>
        ))
      }
    </Layout>
  );
};

export default AccPaid;
