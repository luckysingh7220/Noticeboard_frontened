import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ shadcn import

export default function NoticeForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    message: "",
    category: "general",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/notices", form);
      setForm({
        title: "",
        message: "",
        category: "general",
      });
      navigate("/notices");
    } catch (err) {
      setError(err.response?.data?.message || "Posting failed");
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 pt-20 px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-xl space-y-6 border border-white/30"
      >
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-center text-blue-800 drop-shadow-sm"
        >
          Submit a Notice
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
          onChange={(e) => handleChange("title", e.target.value)}
          type="text"
          name="title"
          placeholder="Enter Title"
          value={form.title}
          className="w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <motion.textarea
          onChange={(e) => handleChange("message", e.target.value)}
          name="message"
          placeholder="Enter Message"
          value={form.message}
          className="w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm h-36 resize-none"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        ></motion.textarea>

        {/* ✅ Shadcn Select */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Select
            value={form.category}
            onValueChange={(value) => handleChange("category", value)}
          >
            <SelectTrigger className="w-full p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white/60">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          🚀 Post Notice
        </motion.button>
      </motion.form>
    </div>
  );
}
