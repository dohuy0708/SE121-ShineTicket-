import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import EventDetailsModal from "./EventDetailModal";

const EventInvoices = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null); // Lưu hóa đơn được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Kiểm soát modal

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Sự kiện</th>
            <th className="px-4 py-2 text-left">Ban tổ chức</th>
            <th className="px-4 py-2 text-left">Tổng tiền</th>
            <th className="px-4 py-2 text-left">Tiền thu</th>
            <th className="px-4 py-2 text-left">Ngày thanh toán</th>
            <th className="px-4 py-2 "></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{invoice?.event_id?.event_name}</td>
              <td className="px-4 py-2">
                {invoice?.organizer_id?.organizer_name}
              </td>
              <td className="px-4 py-2">
                {invoice?.total_amount?.$numberDecimal} VNĐ
              </td>
              <td className="px-4 py-2">
                {invoice?.refund_amount?.$numberDecimal} VNĐ
              </td>
              <td className="px-4 py-2">
                {new Date(invoice?.refund_date).toLocaleDateString("vi-VN", {
                  timeZone: "UTC",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="flex items-center justify-center"
                  onClick={() => openModal(invoice)}
                >
                  <EyeIcon className="h-6 text-black hover:text-primary" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <EventDetailsModal
          selectedEvent={selectedInvoice}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default EventInvoices;