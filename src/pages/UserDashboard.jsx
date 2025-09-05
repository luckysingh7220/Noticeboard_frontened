import { useEffect, useState } from "react";
import axios from "../services/api";
import NoticeCard from "../components/NoticeCard";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserNotices = async () => {
      try {
        const res = await axios.get("/api/user/me/notices");
        setNotices(res.data);
      } catch (err) {
        setError("Failed to load your notices");
      }
    };

    fetchUserNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ y: -50, opacity: 0 }}   
        animate={{ y: 0, opacity: 1 }}     
        transition={{ duration: 0.6, ease: "easeOut" }} 
      >
        
        <motion.div
          className="bg-white shadow-md rounded-2xl p-6 mb-8 flex items-center gap-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-2xl font-bold shadow-md">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hi, {user?.name} 👋
            </h1>
            <p className="text-gray-600">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 font-medium">
              {user?.role}
            </span>
          </div>
        </motion.div>

    
<motion.div
  className="bg-white shadow-sm rounded-2xl p-6"
  initial={{ y: -30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
>
  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
    📌 Your Notices
  </h2>

  {error && <p className="text-red-500">{error}</p>}

  {notices.length === 0 ? (
    <div className="text-center text-gray-500 py-8">
      <p className="text-lg">You haven’t posted any notices yet.</p>
      <p className="text-sm text-gray-400">
        Start by adding a new notice from the homepage.
      </p>
    </div>
  ) : (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      {notices.map((notice) => (
        <motion.div
          key={notice._id}
          className="w-full min-w-0" 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <NoticeCard notice={notice} />
        </motion.div>
      ))}
    </motion.div>
  )}
</motion.div>

      </motion.div>
    </div>
  );
}
