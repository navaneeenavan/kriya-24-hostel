import React, { useState } from "react";
import Layout from "../components/Layout";
import Dropdown from "../components/Dropdown";
import Inputfield from "../components/TextInput";
import Row from "../components/Row";
import Button from "../components/Button";
import { toast } from "react-hot-toast";
import { fetchAccommodationDetailsbyEmail, fetchAccommodationDetailsbyKriyaId, fetchUpdateAccommodation } from "../API/calls";

const AccommodationPayment = () => {
  const [type, setType] = useState("KRIYA ID");
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const handleFetchData = () => {
    if (id === "") {
      toast.error("Please enter a valid ID");
      return;
    }

    if (type === "KRIYA ID") {
      toast.promise(
        fetchAccommodationDetailsbyKriyaId(id),
        {
          loading: "Fetching Details",
          success: (res) => {
            setData(res.data.accommodations);
            return "Details Fetched";
          }
        },
        {
          error: "Error Fetching Details"
        }
      );
    } else {
      toast.promise(
        fetchAccommodationDetailsbyEmail(id),
        {
          loading: "Fetching Details",
          success: (res) => {
            setData(res.data.accommodations);
            return "Details Fetched";
          }
        },
        {
          error: "Error Fetching Details"
        }
      );
    }
  };

  const handlePaid = () => {
    toast.promise(fetchUpdateAccommodation(data.email, {
      payment: true,
    }), {
      loading: "Updating Details",
      success: (res) => {
        setData(null);
        return "Details Updated";
      }
    },
      {
        error: "Error Updating Details"
      }
    );
  };

  const handleUnPaid = () => {
    toast.promise(fetchUpdateAccommodation(data.email, {
      payment: false,
    }), {
      loading: "Updating Details",
      success: (res) => {
        setData(null);
        return "Details Updated";
      }
    },
      {
        error: "Error Updating Details"
      }
    );
  };

  return (
    <Layout title={"Accommodation Payment"} className={"space-y-6"}>
      <Row>
        <Dropdown
          valueState={[type, setType]}
          options={["KRIYA ID", "EMAIL"]}
          title="Fetch Details From"
        />
        <Inputfield
          valueState={[id, setId]}
          title={
            type === "KRIYA ID"
              ? "Kriya Id (Eg. KRIYA12345)" : "Email (Eg. abc@gmail.com)"
          }
        />
      </Row>
      <Button handleClick={handleFetchData} text="Fetch Data" outlined className="w-1/2" />

      {data && (
        <div className="bg-white rounded-md p-4 flex flex-col space-y-4">
          <h1 className="text-xl font-bold">Details</h1>
          <p className=""><b className="font-semibold">Name:</b> {data.name}</p>
          <p className=""><b className="font-semibold">Email:</b> {data.email}</p>
          <p className=""><b className="font-semibold">Kriya ID:</b> {data.kriyaId}</p>
          <p className=""><b className="font-semibold">College:</b> {data.college}</p>
          <p className=""><b className="font-semibold">Phone:</b> {data.phone}</p>
          <p className=""><b className="font-semibold">Gender:</b> {data.gender}</p>
          <p className=""><b className="font-semibold">Room Type:</b> {data.roomType}</p>
          <p className=""><b className="font-semibold">No. of Days:</b> {data.days} Days</p>
          <p className=""><b className="font-semibold">From Date:</b> {data.from}</p>
          <p className=""><b className="font-semibold">To Date:</b> {data.to}</p>
          <p className=""><b className="font-semibold">Meals:</b> {data.dinner1 && "23th Dinner, "}{data.breakfast1 && "24th Breakfast, "}{data.dinner2 && "24th Dinner, "}{data.breakfast2 && "25th Breakfast, "}{data.dinner3 && "25th Dinner, "}{data.breakfast3 && "26th Breakfast"}</p>
          <p className=""><b className="font-semibold">Amenities Required:</b> {data.amenities}</p>
          <p className="text-xl"><b className="font-semibold">Total Amount:</b> ₹ {data.amount}</p>
          <p className="text-xl"><b className="font-semibold">Payment Status: {data.payment ? <span className="text-green-500">Paid</span> : <span className="text-red-500">Not Paid</span>}</b></p>

          <Row>
            <Button handleClick={handlePaid} text="Mark as paid" className="w-1/2" />
            <Button handleClick={handleUnPaid} text="Mark as unpaid" className="w-1/2" />
          </Row>
        </div>
      )}

      {data === null && (
        <div className="bg-white rounded-md p-4 flex flex-col space-y-4">
          <h1 className="text-xl font-bold">No Details Found</h1>
        </div>
      )}
    </Layout>
  );
};

export default AccommodationPayment;
