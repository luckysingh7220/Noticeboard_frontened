import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password, role }); // 👈 send role
      login(res.data.token);

      if (res.data.role === "admin") navigate("/notices");
      else navigate("/notices");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        {/* Animated content with stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2, // 👈 delay between children
              },
            },
          }}
        >
          {/* Logo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-200 to-yellow-300 shadow">
              <svg
                viewBox="0 0 64 64"
                aria-hidden="true"
                className="w-8 h-8"
              >
                <rect
                  x="10"
                  y="10"
                  rx="6"
                  ry="6"
                  width="34"
                  height="34"
                  fill="#ffffff"
                  stroke="#1f2937"
                  strokeWidth="2"
                />
                <circle cx="27" cy="14" r="3" fill="#ef4444" />
                <line
                  x1="16"
                  y1="22"
                  x2="38"
                  y2="22"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="28"
                  x2="38"
                  y2="28"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="16"
                  y1="34"
                  x2="34"
                  y2="34"
                  stroke="#6b7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="44"
                  cy="44"
                  r="10"
                  fill="#e0f2fe"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
                <line
                  x1="50.5"
                  y1="50.5"
                  x2="58"
                  y2="58"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-center mb-2"
          >
            Welcome Back!
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="text-gray-500 text-center mb-6"
          >
            Please sign in to your account
          </motion.p>

          {/* Error */}
          {error && (
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-center mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <input
              type="email"
              placeholder="Email address"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Role selection */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`px-4 py-2 rounded-lg border ${
                  role === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`px-4 py-2 rounded-lg border ${
                  role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                User
              </button>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-medium shadow-md hover:opacity-90"
            >
              Sign In
            </button>
          </motion.form>

          {/* Signup link */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            className="text-center text-gray-600 mt-6"
          >
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium">
              Sign up here
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
