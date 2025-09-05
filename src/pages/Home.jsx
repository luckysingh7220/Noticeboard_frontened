import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/Authcontext";
import { motion } from "framer-motion"; // ✅ Import motion

export default function Home() {
  const [latestNotices, setLatestNotices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLatestNotices = async () => {
      try {
        const res = await axios.get("/api/notices?limit=3");
        setLatestNotices(res.data);
      } catch (err) {
        setError("Failed to load latest notices");
      }
    };
    fetchLatestNotices();
  }, []);

  const handleNavigate = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start 
    bg-gradient-to-b from-blue-50 to-white 
    p-6 pt-20 mt-0 md:pt-24">

      {/* Hero Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}      // start above, hidden
        animate={{ y: 0, opacity: 1 }}        // drop into place
        transition={{ duration: 0.8, ease: "easeOut" }} // smooth
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Community NoticeBoard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay updated with the latest notices, announcements, and events in your community.
        </p>

        {/* Call to Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleNavigate("/notices")}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
          >
            See All Notices
          </button>
          <button
            onClick={() => handleNavigate("/new")}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-2xl shadow hover:bg-gray-300 transition"
          >
            Post a Notice
          </button>
        </div>
      </motion.div>

      {/* Latest Notices Preview */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}       // start lower, hidden
        animate={{ y: 0, opacity: 1 }}        // move up into place
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} // delay for staggered effect
        className="mt-12 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Latest Notices
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {latestNotices.length === 0 ? (
          <p className="text-gray-500 text-center">No notices yet</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {latestNotices.map((notice, i) => (
              <motion.div
                key={notice._id}
                onClick={() => handleNavigate(`/notices/${notice._id}`)}
                className="cursor-pointer group"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }} // staggered cards
              >
                <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-200 
                                rounded-2xl shadow hover:shadow-xl transition 
                                hover:scale-[1.02] duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-700">
                    {notice.title}
                  </h3>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {notice.message}
                  </p>
                  <p className="mt-3 text-xs text-gray-600">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
