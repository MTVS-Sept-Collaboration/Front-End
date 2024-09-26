import React from "react";
import { dataStats } from "@/types/dataStats";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faDumbbell, faUsers, faHandsPraying } from '@fortawesome/free-solid-svg-icons'

const dataStatsList = [
  {
    icon: (
      <FontAwesomeIcon icon={faUsers} size="xl" />
    ),
    color: "#3FD97F",
    title: "전체 회원수",
    value: "926",
    growthRate: 0.43,
  },
  {
    icon: (
      <FontAwesomeIcon icon={faHandsPraying} size="xl" />
    ),
    color: "#FF9C55",
    title: "현재 접속자 수",
    value: "212",
    growthRate: 3.35,
  },
  {
    icon: (
      <FontAwesomeIcon icon={faDumbbell} size="xl" />
    ),
    color: "#8155FF",
    title: "전체 운동수",
    value: "12",
    growthRate: 5.5,
  },
];

const DataStats: React.FC<dataStats> = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-sm font-medium">{item.title}</span>
              </div>

              <span
                className={`flex items-center gap-1.5 text-body-sm font-medium ${
                  item.growthRate > 0 ? "text-green" : "text-red"
                }`}
              >
                {item.growthRate}%
                {item.growthRate > 0 ? (
                  <FontAwesomeIcon icon={faArrowUp} size="xl" />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} size="xl" />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStats;
