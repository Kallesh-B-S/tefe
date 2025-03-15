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
import { clearCredentials, setLoginError } from "../reduxToolKit/slice/LoginSlice";
import { useRouter } from "next/navigation";
import BasicDetailsTable, { BasicDetailsType } from "./BasicDetailsTable";
import ParamTable, { ParamTableType } from "./ParamTable";
import paramTableDataSet from "@/lib/sample-data/paramTableData.json"
import { DataTablePagination } from "../components/DataTable/DataTablePagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { setLoginTableData } from "../reduxToolKit/slice/LoginTableSlice";

// Ensure this is the very first line

export default function HomePage() {

  let data: BasicDetailsType[] = [{
    SPID: 23,
    NAMEOF: 'The sun set behind the mountains, casting a warm glow over the valley as night began to fall.',
    LOOKUPCODE: 'CIB',
    ADDRESS1: '123 MAIN STREET',
    ADDRESS2: null,
    CITY: 'ITASCA',
    STATE: 'IL',
    COUNTRY: 'US',
    ISSUINGREGION: '02',
    REPLACEMENTREGION: '62',
    DATECREATED: '2025-03-05T22:00:25.000Z',
    CREATEDBY: 'SYSTEM',
    INACTIVEFLAG: 'N',
    INACTIVEDATE: null,
    LASTUPDATEDBY: null,
    LASTUPDATEDDATE: null,
    BONDSURETY: '035',
    CARGOPOLICYNO: null,
    CARGOSURETY: '035',
    ZIP: '60173'
  }]

  // let paramTableData: ParamTableType[] = paramTableDataSet.slice(0, 20);
  let paramTableData: ParamTableType[] = paramTableDataSet;

  const [isTable1Expanded, setIsTable1Expanded] = useState(true);
  const [isTable2Expanded, setIsTable2Expanded] = useState(true);
  const [isTable3Expanded, setIsTable3Expanded] = useState(true);

  const toggleTable1 = () => {
    setIsTable1Expanded(!isTable1Expanded);
  };

  const toggleTable2 = () => {
    setIsTable2Expanded(!isTable2Expanded);
  };

  const toggleTable3 = () => {
    setIsTable3Expanded(!isTable3Expanded);
  };

  // const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loginFormSelector = useSelector((state: RootState) => state.loginForm)
  const pieChartSelector = useSelector((state: RootState) => state.pieChart)
  const basicDetailsData:BasicDetailsType[] =   useSelector((state:RootState)=> state.loginTable.basicDetailsData)
  const ParamTableData:ParamTableType[] =   useSelector((state:RootState)=> state.loginTable.ParamTableData)
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
        if (response.data.chartResult) {
          dispatch(setPieChartData(response.data.chartResult))
          dispatch(clearCredentials())
        }
        else if (response.data.error) {
          dispatch(setLoginError(response.data.error))
          dispatch(clearCredentials())
          router.push('/');
        }

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

  useEffect(()=>{
    console.log("data updated");
    
  },[basicDetailsData,ParamTableData])

  const handleTableData = async (id:number) => {
    try {
      const domain = domainNameResolver(window.location.hostname)
      const response = await axios.get(`${domain}/oracle/GetHomePageData/${id}`);

      // const response = await axios.get(`${domain}/data/${id}`);
      console.log("response ----------------------", response);
      if (response.data.data['p_basic_details']) {
        dispatch(setLoginTableData({basicDetailsData : response.data.data['p_basic_details'],ParamTableData:response.data.data['p_param']}))
        // dispatch(clearCredentials())
      }
      // else if (response.data.error) {
      //   dispatch(setLoginError(response.data.error))
      //   dispatch(clearCredentials())
      //   router.push('/');
      // }
    } catch (error) {

    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <Navbar />
      <div className="w-[97vw] bg-[#f4f4f4] flex flex-col justify-center mx-auto pb-5">
        <div className="m-2">
          {/* <h1>Service Providers</h1> */}
          <h2 className="pt-5 pr-5 pb-0 pl-5">Click <span className="text-blue-700"><Link href={''}>here</Link></span> to add new Service Provider.</h2>
        </div>

        <div className=" m-auto flex w-[90%] flex-wrap justify-evenly pb-10">
          {
            // [
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 22,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   },
            //   {
            //     Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
            //     SPID: 23,
            //     CARNETSTATUS: ['Open Claim', 'Possible Claim', 'Valid'],
            //     Carnet_Count: [6, 12, 36]
            //   }
            // ]
            // .map((x: {
            pieChartSelector.data.map((x: {
              Service_Provider_Name: string;
              Carnet_Count: number[];
              CARNETSTATUS: string[];
              SPID:number;
            }, i) => (
              <div key={x.Service_Provider_Name + i} className="bg-gray-300 rounded-2xl m-5">
                <div className="flex w-[250px] h-[50px] text-[12px] items-center p-1 text-center justify-center">
                  {x.Service_Provider_Name.toUpperCase()}
                </div>
                <div className="flex justify-center mt-1"><FiEdit onClick={()=>handleTableData(x.SPID)} className="!cursor-pointer" /></div>
                <PieChart name={x.Service_Provider_Name} data={x.Carnet_Count} labels={x.CARNETSTATUS} />
              </div>
            ))
          }
        </div>

        <div className=" flex flex-col p-1 pb-10 m-1 w-[99.4%] space-y-3">
          <div className="w-full">
            <div className=" flex">
              <Button variant={"outline"} onClick={toggleTable1}>
                <div className={`transition-transform duration-200 ${isTable1Expanded ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown />
                </div>
              </Button>
              <div onClick={toggleTable1} className="font-bold cursor-pointer p-1 ">table 1</div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isTable1Expanded ? 'max-h-full' : 'max-h-0'} `}>
              <div className="w-[93%] bg-white m-auto p-2 rounded-tl-lg">
                {/* Content for table 1 goes here */}
                <BasicDetailsTable data={basicDetailsData} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className=" flex">
              <Button variant={"outline"} onClick={toggleTable2}>
                <div className={`transition-transform duration-200 ${isTable2Expanded ? 'rotate-180' : 'rotate-0'}`}>
                  <ChevronDown />
                </div>
              </Button>
              <div onClick={toggleTable2} className="font-bold cursor-pointer p-1 ">table 2</div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isTable2Expanded ? 'max-h-full' : 'max-h-0'}`}>
              <div className="w-[93%] bg-white m-auto p-2 rounded-tl-lg">
                {/* Content for table 2 goes here */}
                {/* <DataTablePagination table={ParamTable} /> */}
                <ParamTable data={ParamTableData} />
              </div>
            </div>
          </div>
          {/* <div className="w-full">
            <div onClick={toggleTable3} className="cursor-pointer flex justify-between items-center">
              <h2 className="font-bold">table 3</h2>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isTable3Expanded ? 'max-h-full' : 'max-h-0'}`}>
              <div className="w-[90%] bg-white m-auto p-2">
                <p>This is the content of table 3.</p>
              </div>
            </div>
          </div> */}
        </div>


      </div>
    </>
  );
}