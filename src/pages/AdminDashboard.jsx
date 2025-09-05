import { useEffect, useState } from "react";
import axios from "../services/api";
import NoticeCard from "../components/NoticeCard";
import { useAuth } from "../context/Authcontext";
import ShowUsers from "../components/showUsers";
import { markNotificationAsRead } from "../api/notificationApi";
import { useNotification } from "../context/NotificationContext";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { setNotifications, setUnreadCount } = useNotification();
  const { user } = useAuth();
  const [unapproved, setUnapproved] = useState([]);
  const [error, setError] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  // 🔹 Fetch unapproved notices
  const fetchUnapprovedNotices = async () => {
    try {
      const res = await axios.get("/api/notices/admin/unapproved");
      setUnapproved(res.data);
    } catch (err) {
      setError("Could not fetch unapproved notices");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`/api/notices/approve/${id}`);
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.notice === id || n.notice?._id === id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));

      await fetchUnapprovedNotices(); // ✅ refresh after approve
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`/api/notices/reject/${id}`);
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.notice === id || n.notice?._id === id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));

      await fetchUnapprovedNotices(); // ✅ refresh after reject
    } catch (err) {
      console.error("Rejection failed", err);
    }
  };

  useEffect(() => {
    fetchUnapprovedNotices();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 pt-15 px-4 gap-6">
      {/* ---------------- LEFT SIDE ---------------- */}

      {/* Small screens: Show button */}
      <div className="lg:hidden w-full mt-4">
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="cursor-pointer w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          {showUsers ? "❌ Hide Users" : "👥 Show Users"}
        </button>

        {showUsers && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 w-full bg-white shadow-lg rounded-2xl p-4"
          >
            <h2 className="text-lg font-semibold mb-3 border-b pb-2">
              👥 All Registered Users
            </h2>
            <div className="space-y-4">
              <ShowUsers />
            </div>
          </motion.div>
        )}
      </div>

      {/* Large screens: Show full panel */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block w-full lg:w-1/2 h-[60vh] lg:h-screen overflow-y-auto p-6 bg-white shadow-lg rounded-2xl mt-6 lg:mt-0"
      >
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          👥 All Registered Users
        </h2>
        <ShowUsers />
      </motion.div>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-auto lg:h-screen overflow-y-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="bg-white shadow-md rounded-2xl p-6"
        >
          {/* Profile Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-2xl font-bold shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, {user?.name} 👋
              </h1>
              <p className="text-gray-600">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium">
                {user?.role}
              </span>
            </div>
          </motion.div>

          {/* Notices Section */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: -15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold mb-3 border-b pb-2"
          >
            📌 Unapproved Notices
          </motion.h2>

          {error && (
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-center font-medium mb-4"
            >
              {error}
            </motion.p>
          )}

          {unapproved.length === 0 ? (
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 0.6 }}
              className="text-gray-500 italic text-center"
            >
              No pending notices for approval 🎉
            </motion.p>
          ) : (
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="space-y-4"
            >
              {unapproved.map((notice) => (
                <motion.div
                  key={notice._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <NoticeCard
                    notice={notice}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
