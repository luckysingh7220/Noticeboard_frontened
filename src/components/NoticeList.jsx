import { useEffect, useState } from "react";
import axios from "../services/api";
import NoticeCard from "../components/NoticeCard";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

// shadcn/ui components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NoticeList() {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("/api/notices");
        setNotices(res.data);
      } catch (err) {
        setError("Failed to load notices");
      }
    };
    fetchNotices();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // filtering
  const filteredNotices = notices.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || n.category === category;
    const matchesStatus = status === "all" || n.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 px-4 sm:px-6">
      {/* Container animation */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8"
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          📢 All Notices
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="🔍 Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[200px] bg-white shadow-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-200">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="urgent">🔥 Urgent</SelectItem>
                <SelectItem value="event">🎉 Event</SelectItem>
                <SelectItem value="general">📄 General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[200px] bg-white shadow-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">✅ Approved</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
                <SelectItem value="rejected">❌ Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notices */}
        {filteredNotices.length === 0 ? (
          <p className="text-gray-600 text-center py-10">No notices found</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2, // delay between cards
                },
              },
            }}
          >
            {filteredNotices.map((notice, idx) => (
             <motion.div
             key={notice._id}
             className="min-w-0"  // 🔑 allows content to shrink instead of forcing width
             variants={{
               hidden: { opacity: 0, y: -50 },
               visible: { opacity: 1, y: 0 },
             }}
             transition={{ duration: 0.6, ease: "easeOut" }}
           >
             <NoticeCard
               notice={notice}
               setNotice={setNotices}
               userRole={user?.role}
             />
           </motion.div>
           
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
