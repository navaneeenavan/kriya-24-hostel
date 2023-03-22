import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { fetchDeptWise } from "../API/calls";
import { toast } from "react-hot-toast";
import departments from "./DepartmentList.js";
const DepartmentWise = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    toast.promise(fetchDeptWise(), {
      loading: "Loading...",
      success: (data) => {
        setData(data.data.deptWiseCount);
        return "Success!";
      },
      error: (err) => {
        console.log(err);
        return "Error!" + err;
      },
    });
  }, []);

  return (
    <Layout title={"Department Wise"}>
      {data.length > 0 ? (
        <div className="grid grid-cols-[200px_1fr] gap-4">
          {departments.map((dept, index) => {
            return (
              <React.Fragment>
                <div className="">
                  <p className="font-semibold text-sm">{dept}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <div className="w-fit">
                        <div className="text-sm">year-{item}</div>
                        <div className="text-4xl font-semibold">
                          {data.find(
                            (d) =>
                              d._id.year === item && d._id.department === dept
                          )
                            ? data.find(
                                (d) =>
                                  d._id.year === item &&
                                  d._id.department === dept
                              ).count
                            : 0}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <div className="">Loading...</div>
      )}
    </Layout>
  );
};

export default DepartmentWise;
