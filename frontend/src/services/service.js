import { events } from "../mocks/mock";

const mockLogin = async (userName, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userName === "hh@gmail.com" && password === "123456") {
        resolve({ id: 1, userName: userName, token: "fake-jwt-token" });
      } else {
        reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng!"));
      }
    }, 1000);
  });
};
// const loginService = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, {
//       email,
//       password,
//     });
//     return response.data; // Trả về dữ liệu từ server
//   } catch (error) {
//     throw error.response?.data?.message || "Đăng nhập thất bại"; // Xử lý lỗi
//   }
// };
const getEvents = async () => {
  return events;
};
const getEventById = async (id) => {
  const event = events.find((event) => event.event_id === Number(id));

  // Kiểm tra xem sự kiện có tồn tại hay không
  if (!event) {
    throw new Error(`Event with id ${id} not found`);
  }

  return event;
};
export { mockLogin, getEventById, getEvents };