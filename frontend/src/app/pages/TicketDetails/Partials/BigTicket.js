// src/components/EventInfo.js
import React from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

const BigTicket = ({ event }) => {
  return (
    <div className="w-full h-max pb-8 mt-4 pl-4 pr-4">
      <div className="w-full h-full grid grid-cols-3 text-white rounded-[1.5rem] bg-bg-primary overflow-hidden">
        <div className="flex col-span-1 bg-[#38383D] relative p-[1.875rem]">
          <div className="absolute w-[3.75rem] h-[3.75rem] rounded-full z-11 top-0 right-0 transform translate-x-[1.875rem] translate-y-[-1.875rem] bg-bg-main"></div>
          <div className="absolute w-[3.75rem] h-[3.75rem] rounded-full z-11 bottom-0 right-0 transform translate-x-[1.875rem] translate-y-[1.875rem] bg-bg-main"></div>
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-bold font-inter  overflow-hidden break-words">
                {event.name}
              </p>
              <p className="font-bold mt-4 text-primary flex items-center">
                <CalendarDaysIcon className="inline h-6 text-white mr-2" />{" "}
                {event.date}
              </p>
              <p className="font-bold mt-4 text-primary flex items-center">
                <MapPinIcon className="inline h-6 text-white mr-2" />{" "}
                {event.location}
              </p>
            </div>
            <div className="border-t border-[#C4C4CF]">
              <div className="flex items-center gap-2 py-4 text-2xl font-bold">
                <p className="text-lg font-semibold ">
                  Giá từ:{" "}
                  <span className="text-xl font-bold text-primary">
                    {event.price}
                  </span>
                </p>
              </div>
              <Link to={"/select-ticket"} state={{ event }}>
                <button className="w-full bg-primary py-2 rounded-md hover:bg-white hover:text-black font-bold text-white">
                  Mua vé ngay
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover object-center overflow-clip"
            src="/img.png"
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
};

export default BigTicket;