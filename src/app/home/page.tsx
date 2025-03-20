"use client";
import { FiEdit } from "react-icons/fi";
import PieChart from "../components/PieChart";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reduxToolKit/store";
import Navbar from "../components/nav/Navbar";
import { BasicDetailsType } from "./BasicDetailsTable";
import { ParamTableType } from "./ParamTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { LoginUser } from "../reduxToolKit/slice/LoginTableSlice";
import FeesAndCommission, { FeesAndCommissionType } from "./FeesAndCommissionTable";
import { cancelAll, checkFor_isAdded, loginTableEditType, setFeesAndCommissionEditData_isEditError } from "../reduxToolKit/slice/LoginTableEditSlice";
import FeesAndCommissionTableEditForm from "../editForm/homePageTable/FeesAndCommissionTableEditForm";
import { getCarnetSummaryData } from "../reduxToolKit/thunk/homePage";
import { LoginState } from "../reduxToolKit/slice/LoginSlice";
import { set_active_chart_SPID } from "../reduxToolKit/slice/TempSlice";

// Ensure this is the very first line

export default function HomePage() {

  // let data: BasicDetailsType[] = [{
  //   SPID: 23,
  //   NAMEOF: 'The sun set behind the mountains, casting a warm glow over the valley as night began to fall.',
  //   LOOKUPCODE: 'CIB',
  //   ADDRESS1: '123 MAIN STREET',
  //   ADDRESS2: null,
  //   CITY: 'ITASCA',
  //   STATE: 'IL',
  //   COUNTRY: 'US',
  //   ISSUINGREGION: '02',
  //   REPLACEMENTREGION: '62',
  //   DATECREATED: '2025-03-05T22:00:25.000Z',
  //   CREATEDBY: 'SYSTEM',
  //   INACTIVEFLAG: 'N',
  //   INACTIVEDATE: null,
  //   LASTUPDATEDBY: null,
  //   LASTUPDATEDDATE: null,
  //   BONDSURETY: '035',
  //   CARGOPOLICYNO: null,
  //   CARGOSURETY: '035',
  //   ZIP: '60173'
  // }]

  // const [isTable1Expanded, setIsTable1Expanded] = useState(true);
  const [isTable2Expanded, setIsTable2Expanded] = useState(true);
  // const [isTable3Expanded, setIsTable3Expanded] = useState(true);

  const [isChartClicked, setChatClicked] = useState(false);

  // const toggleTable1 = () => {
  //   setIsTable1Expanded(!isTable1Expanded);
  // };

  const toggleTable2 = () => {
    setIsTable2Expanded(!isTable2Expanded);
  };

  // const toggleTable3 = () => {
  //   setIsTable3Expanded(!isTable3Expanded);
  // };

  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pieChartSelector = useSelector((state: RootState) => state.pieChart)
  const basicDetailsData: BasicDetailsType[] = useSelector((state: RootState) => state.loginTable.basicDetailsData)
  const ParamTableData: ParamTableType[] = useSelector((state: RootState) => state.loginTable.ParamTableData)
  const FeesAndCommissionTableData: FeesAndCommissionType[] = useSelector((state: RootState) => state.loginTable.FeesAndCommissionTableData)
  const LoginTableEditData: loginTableEditType = useSelector((state: RootState) => state.loginTableEdit)
  const LoginData: LoginState = useSelector((state: RootState) => state.loginForm)
  // const TempData:TempState = useSelector((state:RootState)=>state.tempState)
  const dispatch = useDispatch<AppDispatch>();
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (LoginTableEditData.feesAndCommissionEditData.isEditError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: "center" });

      const timer = setTimeout(() => {
        dispatch(setFeesAndCommissionEditData_isEditError(''));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [LoginTableEditData.feesAndCommissionEditData.isEditError, dispatch]);


  useEffect(() => {
    getCarnetSummaryData(dispatch, setError, setLoading, LoginData);
  }, []);

  useEffect(() => {
    console.log(
      "------l",
      // LoginTableEditData?.feesAndCommissionEditData?.toBeEditedData?.p_fees_comm[0]?.FEECOMMID,
      // LoginTableEditData?.feesAndCommissionEditData?.editedData
      FeesAndCommissionTableData
    );

  }, [basicDetailsData, ParamTableData, FeesAndCommissionTableData, LoginTableEditData, getCarnetSummaryData])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (x: any) => {
    dispatch(LoginUser({ id: x.SPID }));
    dispatch(set_active_chart_SPID(x.SPID));
    setChatClicked(true)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <Navbar />
      <div className="w-[97vw] bg-[#f4f4f4] flex flex-col justify-center mx-auto pb-5">
        <div className="m-2">
          <h2 className="pt-5 pr-5 pb-0 pl-5">Click <span className="text-blue-700"><Link href={''}>here</Link></span> to add new Service Provider.</h2>
        </div>

        <div className=" m-auto flex w-[90%] flex-wrap justify-evenly pb-10">
          {
            pieChartSelector.data.map((x: {
              Service_Provider_Name: string;
              Carnet_Count: number[];
              CARNETSTATUS: string[];
              SPID: number;
            }, i) => (
              <div key={x.Service_Provider_Name + i} className="bg-gray-300 rounded-2xl m-5">
                <div className="flex w-[250px] h-[50px] text-[12px] items-center p-1 text-center justify-center">
                  {x.Service_Provider_Name ? x.Service_Provider_Name.toUpperCase() : x.Service_Provider_Name}
                </div>
                <div className="flex justify-center mt-1">
                  <FiEdit onClick={() => handleLogin(x)} className="!cursor-pointer" />
                </div>
                <PieChart name={x.Service_Provider_Name} data={x.Carnet_Count} labels={x.CARNETSTATUS} />
              </div>
            ))
          }
        </div>

        {
          isChartClicked ?
            (
              <div className={` flex flex-col p-1 pb-5 m-1 w-[99.4%] space-y-3  ${checkFor_isAdded(LoginTableEditData) ? 'bg-gray-300' : ''}`}>


                {/* <div className="w-full">
                  <div className=" flex">
                    <Button variant={"outline"} onClick={toggleTable1}>
                      <div className={`transition-transform duration-200 ${isTable1Expanded ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown />
                      </div>
                    </Button>
                    <div onClick={toggleTable1} className="font-bold cursor-pointer p-1 ">table 1</div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isTable1Expanded ? 'max-h-full' : 'max-h-0'} flex flex-col`}>
                    <div className="w-[93%] bg-white m-auto p-2 rounded-tl-lg">
                      <BasicDetailsTable data={basicDetailsData} />
                    </div>
                    {
                      LoginTableEditData.basicDetailsEditData.isEdit &&
                      <BasicDetailsEditForm />
                    }
                  </div>
                </div> */}

                <div className="w-full pt-5">
                  <div className=" flex">
                    <Button variant={"outline"} onClick={toggleTable2}>
                      <div className={`transition-transform duration-200 ${isTable2Expanded ? 'rotate-180' : 'rotate-0'}`}>
                        <ChevronDown />
                      </div>
                    </Button>
                    <div onClick={toggleTable2} className="font-bold cursor-pointer p-1 ">{`Fees & Commission`}</div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isTable2Expanded ? 'max-h-full' : 'max-h-0'}`}>
                    <div className="w-[93%] bg-white m-auto p-2 rounded-tl-lg">
                      {/* Content for table 2 goes here */}
                      {/* <DataTablePagination table={ParamTable} /> */}
                      {/* <ParamTable data={ParamTableData} /> */}
                      {
                        LoginTableEditData.feesAndCommissionEditData.isEditError &&
                        <div ref={errorRef} className="flex justify-center items-center text-red-600 font-medium">
                          {LoginTableEditData.feesAndCommissionEditData.isEditError}
                        </div>
                      }
                      <FeesAndCommission data={FeesAndCommissionTableData} />
                    </div>
                    {
                      LoginTableEditData.feesAndCommissionEditData.isEdit &&
                      <FeesAndCommissionTableEditForm />
                    }
                  </div>
                </div>
                {
                  checkFor_isAdded(LoginTableEditData) &&
                  <div className="flex gap-2 justify-end pr-11">
                    <Button className="bg-green-400 text-black w-20 h-8 hover:bg-green-500 active:bg-black active:text-green-500"
                      onClick={async () => {
                        // await saveAll(dispatch, LoginTableEditData)
                        dispatch(cancelAll())
                      }}
                    >
                      Save All
                    </Button>
                    <Button className="bg-red-500 text-black w-20 h-8 hover:bg-red-600 active:bg-black active:text-red-600"
                      onClick={() => dispatch(cancelAll())}>
                      Cancel All
                    </Button>
                  </div>
                }
              </div>
            ) :
            null
        }
      </div>
    </>
  );
}