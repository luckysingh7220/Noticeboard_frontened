import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function SingleNotice() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`/api/notices/${id}`);
        setNotice(res.data);
      } catch (err) {
        setError("Failed to load notice.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/notices/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/notices");
    } catch (err) {
      console.error("Failed to delete notice", err);
      alert("Something went wrong while deleting the notice.");
    }
  };

  if (loading) return <p className="text-gray-600 text-center">Loading notice...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!notice) return <p className="text-gray-600 text-center">Notice not found.</p>;

  const statusStyles = {
    approved: "bg-green-50 border border-green-300",
    pending: "bg-yellow-50 border border-yellow-300",
    rejected: "bg-red-50 border border-red-300",
  };

  return (
    <div
      className={`max-w-3xl mx-auto p-6 shadow-lg rounded-lg transition pt-20 px-6
      ${statusStyles[notice.status] || "bg-white border"}`}
    >
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
        {notice.title}
        {notice.pinned && (
          <span className="text-red-600 text-sm font-semibold">📌</span>
        )}
      </h1>

      <p className="text-gray-800 mt-4">{notice.message}</p>

      <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
        <span className="px-2 py-1 rounded bg-gray-200">
          {notice.category.toUpperCase()}
        </span>
        <span>{new Date(notice.createdAt).toLocaleString()}</span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="italic text-blue-700">
          Posted by: {notice.user?.name || "Unknown"}
        </p>

        {notice.status && (
          <p
            className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
              notice.status === "approved"
                ? "text-green-700 bg-green-100"
                : notice.status === "pending"
                ? "text-yellow-700 bg-yellow-100"
                : "text-red-700 bg-red-100"
            }`}
          >
            {notice.status === "approved" && "✔ Approved"}
            {notice.status === "pending" && "⏳ Pending Approval"}
            {notice.status === "rejected" && "❌ Rejected"}
          </p>
        )}
      </div>
      {user?.role === "admin" && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate(`/notices/edit/${notice._id}`)}
            className="cursor-pointer flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(notice._id)}
            className="cursor-pointer flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
