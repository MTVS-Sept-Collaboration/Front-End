"use client";
import React from "react";
import DataStats from "@/components/DataStats/DataStats";
import CCU from "@/components/Charts/CCU";
import Subscriber from "@/components/Charts/Subscriber";

const Dashboard: React.FC = () => {
  return (
    <>
      <DataStats />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <CCU />
        <Subscriber />
      </div>
    </>
  );
};

export default Dashboard;
