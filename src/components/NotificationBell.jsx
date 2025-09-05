import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { fetchMyNotifications } from "../api/notificationApi";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";

export default function NotificationBell() {
  const { unreadCount,setUnreadCount } = useNotification();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await fetchMyNotifications();
        console.log("Fetched notifications:", data);
        const unread = data.filter((n) => !n.read);
        setUnreadCount(unread.length);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Link to="/notifications" className="relative inline-block">
    {/* Bell Icon */}
    <Bell className="h-6 w-6 text-white hover:text-gray-300 transition" />

    {/* Notification Badge */}
    {unreadCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
        {unreadCount}
      </span>
    )}
  </Link>
  );
}
