"use client";
import { FiEdit } from "react-icons/fi";
import PieChart from "../components/PieChart";

// Ensure this is the very first line

export default function HomePage() {
  return (
    <>
      <div className="w-[97vw] bg-[#f4f4f4] flex flex-col justify-center mx-5">
        <div className="m-2">
          {/* <h1>Service Providers</h1> */}
          <h2 className="p-5">Click <span>here</span> to add new Service Provider.</h2>
        </div>
        <div className=" m-auto flex w-[90%] flex-wrap justify-evenly gap-1 py-10">
          {
            [
              {
                Service_Provider_Name: 'Roanoke',
                SPID: 22,
                CARNETSTATUS: [ 'Open Claim', 'Possible Claim', 'Valid' ],
                Carnet_Count: [ 14, 21, 63 ]
              },
              {
                Service_Provider_Name: 'CORPORATION FOR INTERNATIONAL BUSINESS',
                SPID: 23,
                CARNETSTATUS: [ 'Open Claim', 'Possible Claim', 'Valid' ],
                Carnet_Count: [ 6, 12, 36 ]
              }
            ].map((x, i) => (
              <div key={x.Service_Provider_Name + i} className="bg-gray-300 rounded-2xl">
                <div className="flex w-[250px] h-[50px] text-[12px] items-center p-1 text-center justify-center overflow-hidden ">
                  {x.Service_Provider_Name.toUpperCase()}
                </div>
                <div className="flex justify-center mt-1"><FiEdit className="!cursor-pointer" /></div>
                <PieChart name={x.Service_Provider_Name} data={x.Carnet_Count} labels={x.CARNETSTATUS}/>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}