import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

const PaymentEventList = ({ events, onPay, onViewDetails, onSearch }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-center  ">Tên sự kiện</th>
            <th className="px-4 py-2 text-center  ">Ngày kết thúc</th>
            <th className="px-4 py-2 text-center  ">Số tiền thu được</th>
            <th className="px-4 py-2 text-center  ">Số tiền cần thanh toán</th>
            <th className="px-4 py-2 text-center  ">Thông tin thanh toán</th>
            <th className="px-4 py-2 "></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="hover:bg-gray-50 text-center">
              <td className="px-4 py-2">{event?.event_name}</td>
              <td className="px-4 py-2">
                {" "}
                {new Date(event?.end_date).toLocaleDateString("vi-VN", {
                  timeZone: "UTC",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
              </td>

              <td className="px-4 py-2">{event?.event_total_amount} VND</td>
              <td className="px-4 py-2">
                {(event?.event_total_amount * 10) / 100} VNĐ
              </td>
              <td className="px-4 py-2">
                {event?.organizer_id?.account_number} -{" "}
                {event?.organizer_id?.bank_name}
              </td>

              <td className="px-4 py-2 text-center">
                <button onClick={() => onViewDetails(event)}>
                  <EyeIcon className="h-6 text-black hover:text-primary" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentEventList;