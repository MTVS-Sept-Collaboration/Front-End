"use client";
import React from "react";
import ChartTwo from "../Charts/ChartTwo";
import DataStats from "@/components/DataStats/DataStats";
import ChartOne from "@/components/Charts/ChartOne";

const Dashboard: React.FC = () => {
  return (
    <>
      <DataStats />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default Dashboard;
