import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchEvents } from "../API/calls";
import Dropdown from "../components/Dropdown";
import Layout from "../components/Layout";
import Row from "../components/Row";
import Inputfield from "../components/TextInput";
import colleges from "./CollegeList.js";
import departments from "./DepartmentList";
import Button from "../components/Button";

const OnSpotRegistration = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "Welcome@123",
    isPSGStudent: false,
    college: "",
    department: "",
    year: 1,
    phone: "",
    accomodation: "No",
    verified: true,
    isPaid: true,
  });

  const PSG_COLLEGE = `PSG College of Technology (Autonomous), Peelamedu, Coimbatore District 641004`;

  return (
    <Layout className={"space-y-4 px-4 lg:px-0"} title={"Register On Spot"}>
      <Row>
        <Inputfield
          title="Name"
          valueState={[
            formData.name,
            (val) => setFormData({ ...formData, name: val }),
          ]}
        />
        <Inputfield
          title="Email"
          valueState={[
            formData.email,
            (val) => setFormData({ ...formData, email: val }),
          ]}
        />
      </Row>
      <Dropdown
        title="College"
        options={colleges}
        valueState={[
          formData.college,
          (val) =>
            setFormData({
              ...formData,
              college: val,
              isPSGStudent: val === PSG_COLLEGE,
            }),
        ]}
      />
      <Row>
        <Dropdown
          title="Department"
          options={departments}
          valueState={[
            formData.department,
            (val) => setFormData({ ...formData, department: val }),
          ]}
        />
        <Dropdown
          title="Year"
          options={[1, 2, 3, 4, 5]}
          valueState={[
            formData.year,
            (val) => setFormData({ ...formData, year: val }),
          ]}
        />
      </Row>
      <Row>
        <Inputfield
          title="Phone Number"
          valueState={[
            formData.phone,
            (val) => setFormData({ ...formData, phone: val }),
          ]}
        />
        <Dropdown
          title="Require Accomodation ?"
          options={["Yes", "No"]}
          valueState={[
            formData.accomodation,
            (val) => setFormData({ ...formData, accomodation: val }),
          ]}
        />
      </Row>
      <Row className="pt-8">
        <Button text="Register" />
        <Button text="Cancel" outlined />
      </Row>
    </Layout>
  );
};

export default OnSpotRegistration;
