import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import { motion } from "framer-motion";

export default function EditNotice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "general",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch notice data
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/api/notices/${id}`);
        setForm({
          title: res.data.title,
          message: res.data.message,
          category: res.data.category,
        });
      } catch (err) {
        setError("⚠ Failed to load notice");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/notices/${id}`, form);
      navigate("/notices");
    } catch (err) {
      setError("❌ Update failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-lg font-semibold">
        Loading notice...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 pt-20 px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/30 space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-indigo-800 drop-shadow-sm"
        >
          ✏ Edit Notice
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-200 text-red-800 px-4 py-2 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        <motion.input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="w-full p-4 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <motion.textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Enter Message"
          className="w-full p-4 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm h-36 resize-none"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        <motion.select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-4 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm bg-white/70"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <option value="general">General</option>
          <option value="event">Event</option>
          <option value="urgent">Urgent</option>
          <option value="other">Other</option>
        </motion.select>

        <div className="flex gap-3">
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 py-3 bg-gray-300 text-gray-800 font-medium rounded-xl hover:bg-gray-400 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Cancel
          </motion.button>

          <motion.button
            type="submit"
            className="w-1/2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💾 Save Changes
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
