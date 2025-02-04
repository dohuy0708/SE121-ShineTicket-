import React, { useEffect, useState } from "react";
import EventList from "./Partials/EventList";
import EventDetailsModal from "./Partials/EventDetailsModal";
import {
  getAllEvent,
  setOccuredEvent,
  setOccuringEvent,
} from "./services/eventService";
import EventSearchBar from "./Partials/EventSearchBar";

export default function Events() {
  const [events, setEvents] = useState([]); // Danh sách sự kiện
  const [filteredEvents, setFilteredEvents] = useState([]); // Danh sách sự kiện đã lọc
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [activeFilter, setActiveFilter] = useState("Tất cả"); // Bộ lọc đang chọn
  const [searchTerm, setSearchTerm] = useState(""); // Tìm kiếm theo tên sự kiện
  const [selectedEvent, setSelectedEvent] = useState(null); // Sự kiện đã chọn để hiển thị modal

  const statusMap = {
    "Chờ duyệt": "676ece5d50c4e95732edbadd",
    "Sắp diễn ra": "675ea25872e40e87eb7dbf08",
    "Đang diễn ra": "675ea24172e40e87eb7dbf06",
    "Đã kết thúc": "675ea26172e40e87eb7dbf0a",
    "Đã hủy": "676ece8250c4e95732edbadf",
  };
  const fetchEvents = async () => {
    setLoading(true); // Bắt đầu tải
    try {
      const now = new Date(); // Lấy thời điểm hiện tại
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Chỉ lấy ngày hiện tại
      const eventFromApi = await getAllEvent();

      for (let i = 0; i < eventFromApi.length; i++) {
        const startDate = new Date(
          new Date(eventFromApi[i].start_date).getFullYear(),
          new Date(eventFromApi[i].start_date).getMonth(),
          new Date(eventFromApi[i].start_date).getDate()
        );

        const endDate = new Date(
          new Date(eventFromApi[i].end_date).getFullYear(),
          new Date(eventFromApi[i].end_date).getMonth(),
          new Date(eventFromApi[i].end_date).getDate()
        );

        if (
          eventFromApi[i].event_status_id?._id === "675ea25872e40e87eb7dbf08"
        ) {
          if (endDate < today) {
            // Nếu ngày kết thúc sự kiện đã qua
            await setOccuredEvent(eventFromApi[i]._id);
            eventFromApi[i].event_status_id._id = "675ea26172e40e87eb7dbf0a";
          } else if (startDate <= today && endDate >= today) {
            // Đang trong quá trình diễn ra sự kiện
            await setOccuringEvent(eventFromApi[i]._id);
            eventFromApi[i].event_status_id._id = "675ea24172e40e87eb7dbf06";
          }
        }
      }

      //
      setEvents(eventFromApi);
      setFilteredEvents(eventFromApi); // Mặc định hiển thị tất cả sự kiện
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false); // Hoàn tất tải
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  // Lọc sự kiện theo bộ lọc đã chọn
  const filterEvents = (filter) => {
    setActiveFilter(filter); // Cập nhật bộ lọc
    if (filter === "Tất cả") {
      setFilteredEvents(events); // Hiển thị tất cả sự kiện
    } else {
      const statusId = statusMap[filter];
      const filtered = events.filter(
        (event) => event.event_status_id._id === statusId
      );
      setFilteredEvents(filtered); // Cập nhật danh sách sự kiện đã lọc
    }
  };

  // Xử lý tìm kiếm sự kiện
  const handleSearch = ({ searchTerm }) => {
    setSearchTerm(searchTerm);
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered); // Cập nhật danh sách sự kiện đã lọc theo tìm kiếm
  };

  return (
    <div className="p-6">
      <div className=" grid grid-cols-5 mb-4">
        <EventSearchBar onSearch={handleSearch} />{" "}
        {/* Giữ lại thanh tìm kiếm */}
        <div className="flex  gap-3 ml-4 col-span-3">
          {[
            "Tất cả",
            "Chờ duyệt",
            "Sắp diễn ra",
            "Đang diễn ra",
            "Đã kết thúc",
            "Đã hủy",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => filterEvents(filter)}
              className={`py-2 px-4 rounded-lg ${
                activeFilter === filter
                  ? "bg-primary text-black"
                  : "bg-white text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-center">Đang tải sự kiện...</div> // Thông báo đang tải
        ) : filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} onViewDetails={setSelectedEvent} />
        ) : (
          <div className="text-center">Không có sự kiện nào.</div> // Thông báo không có dữ liệu
        )}
      </div>

      {/* Modal hiển thị chi tiết sự kiện */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)} // Đóng modal khi ấn nút đóng
          refreshData={fetchEvents}
        />
      )}
    </div>
  );
}
