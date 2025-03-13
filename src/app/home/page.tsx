"use client";
import { FiEdit } from "react-icons/fi";
import PieChart from "../components/PieChart";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxToolKit/store";
import { setPieChartData } from "../reduxToolKit/slice/PieChartSlice";
import Navbar from "../components/nav/Navbar";
import { domainNameResolver } from "../helper/functions";

// Ensure this is the very first line

export default function HomePage() {

  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loginFormSelector = useSelector((state: RootState) => state.loginForm)
  const pieChartSelector = useSelector((state: RootState) => state.pieChart)
  const dispatch = useDispatch();

  // console.log(loginFormSelector);


  // console.log(loginFormSelector?.p_emailaddr);
  // console.log(loginFormSelector?.p_password);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const domain = domainNameResolver(window.location.hostname)
        const response = await axios.post(`${domain}/auth/login`,
          { p_emailaddr: loginFormSelector.p_emailaddr, p_password: loginFormSelector.p_password });
        console.log("response ----------------------", response);
        dispatch(setPieChartData(response.data.chartResult))
        // setData(response.data);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safe to set as it's an instance of Error
        } else {
          setError(new Error('An unknown error occurred').message); // Fallback for non-Error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <Navbar />
      <div className="w-[97vw] bg-[#f4f4f4] flex flex-col justify-center mx-5">
        <div className="m-2">
          {/* <h1>Service Providers</h1> */}
          <h2 className="p-5">Click <span>here</span> to add new Service Provider.</h2>
        </div>
        <div className=" m-auto flex w-[90%] flex-wrap justify-evenly gap-1 py-10">
          {
            // [
            //   {
            //     Service_Provider_Name: 'Roanoke',
            //     SPID: 22,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [14, 21, 63]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   }
            // ]
            pieChartSelector.data.map((x: {
              Service_Provider_Name: string;
              Carnet_Count: number[];
              CARNETSTATUS: string[];
            }, i) => (
              <div key={x.Service_Provider_Name + i} className="bg-gray-300 rounded-2xl">
                <div className="flex w-[250px] h-[50px] text-[12px] items-center p-1 text-center justify-center overflow-hidden ">
                  {x.Service_Provider_Name.toUpperCase()}
                </div>
                <div className="flex justify-center mt-1"><FiEdit className="!cursor-pointer" /></div>
                <PieChart name={x.Service_Provider_Name} data={x.Carnet_Count} labels={x.CARNETSTATUS} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}