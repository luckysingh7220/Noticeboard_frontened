import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function NoticeCard({ notice, onApprove, onReject }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/notices/${notice._id}`)}
    className={`relative p-5 rounded-2xl shadow-md border cursor-pointer 
      hover:shadow-xl transition-transform transform hover:-translate-y-1
      bg-gradient-to-br ${getCardGradient(notice.category)}
      w-full min-w-0`} // 🔑 forces it to shrink with parent
  >
  
      {/* Pin Badge */}
      {notice.pinned && (
        <span className="absolute top-3 right-3 text-lg" title="Pinned">
          📌
        </span>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
        {notice.title}
      </h2>

      {/* Message */}
      <p className="text-gray-700 mb-4 line-clamp-3">{notice.message}</p>

      {/* Category + Date */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/60">
          {notice.category.toUpperCase()}
        </span>
        <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Status */}
      <div className="text-sm font-medium mb-3">
        {notice.status === "approved" && <span className="text-green-600">✔ Approved</span>}
        {notice.status === "pending" && <span className="text-yellow-600">⏳ Pending</span>}
        {notice.status === "rejected" && <span className="text-red-600">❌ Rejected</span>}
      </div>

      {/* Approve / Reject (Admin Only) */}
      {user?.role === "admin" && notice.status === "pending" && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApprove(notice._id);
            }}
            className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            Approve
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReject(notice._id);
            }}
            className="flex-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function getCardGradient(category) {
  switch (category) {
    case "urgent":
      return "from-red-50 to-red-100 border-red-400";
    case "event":
      return "from-green-50 to-green-100 border-green-400";
    case "general":
      return "from-blue-50 to-blue-100 border-blue-400";
    default:
      return "from-gray-50 to-gray-100 border-gray-300";
  }
}
