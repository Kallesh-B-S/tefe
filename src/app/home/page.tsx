"use client";
import PieChart from "../components/PieChart";

// Ensure this is the very first line

export default function HomePage() {
  return (
    <>
      <div className="w-[100vw]">
        <div>
          <h1>Service Providers</h1>
          <h2>Click <span>here</span> to add new Service Provider.</h2>
        </div>
        <div className="flex w-[90%] flex-wrap justify-center gap-1">
          {
            [
              { name: "a", data: [12, 19, 3, 2, 3] },
              { name: "b", data: [3, 3, 2, 12, 19] },
              { name: "c", data: [12, 3, 2, 3, 19] },
              { name: "d", data: [12, 3, 2, 3, 19] },
              { name: "e", data: [12, 3, 2, 3, 19] },
              { name: "f", data: [12, 3, 2, 3, 19] },
            ].map((x, i) => (
              <div key={x.name + i} className="bg-gray-300">
                <PieChart name={x.name} data={x.data} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}