
import axios from "../services/api";

export const fetchMyNotifications = async () => {
  const res = await axios.get("/api/notifications");
  return res.data;
};

export const markNotificationAsRead = async (id) => {
  const res = await axios.patch(`/api/notifications/${id}/read`);
  return res.data;
};
export const deleteNotification = async (id) => {
  const res = await axios.delete(`/api/notifications/${id}`);
  return res.data;
};
