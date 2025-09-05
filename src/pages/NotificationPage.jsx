import { useEffect } from "react";
import {
  fetchMyNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../api/notificationApi";
import { useNotification } from "../context/NotificationContext";

export default function NotificationsPage() {
  const { notifications, setNotifications, setUnreadCount } = useNotification();

  useEffect(() => {
    const fetchAll = async () => {
      const data = await fetchMyNotifications();
      setNotifications(data);
      const unread = data.filter((n) => !n.read);
      setUnreadCount(unread.length);
    };
    fetchAll();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => prev - 1);
  };

  const handleDelete = async (id) => {
    const target = notifications.find((n) => n._id === id);
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    if (target && target.read === false) {
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">🎉 No notifications yet.</p>
      ) : (
        <ul className="space-y-5">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`relative p-6 rounded-2xl shadow-md transition border-2 hover:shadow-lg ${
                n.read
                   ? "bg-gradient-to-r from-green-50 to-emerald-100 border-emerald-200"
    : "bg-gradient-to-r from-indigo-100 to-blue-200 border-blue-300"
              }`}
            >
              {/* Status badge */}
    

              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <p className="text-gray-800 text-base leading-relaxed">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {!n.read && (
                    <button
                      onClick={() => handleMarkAsRead(n._id)}
                      className="px-4 py-1.5 text-xs font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n._id)}
                    className="px-4 py-1.5 text-xs font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
