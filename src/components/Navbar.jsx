import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600
      text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
      <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
        🗒️ NoticeBoard
      </Link>
      <div className="hidden md:flex items-center space-x-6">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/new" className="hover:text-gray-300">Post Notice</Link>
            <Link to="/notices" className="hover:text-gray-300">All Notices</Link>
            {user.role === "admin" ? (
              <Link to="/dashboard/admin" className="hover:text-gray-300">Admin Dashboard</Link>
            ) : (
              <Link to="/dashboard/user" className="hover:text-gray-300">User Dashboard</Link>
            )}
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
            <NotificationBell />
          </>
        )}
      </div>
      <button
  className="md:hidden focus:outline-none cursor-pointer"
  onClick={() => setMenuOpen(true)}
>
  <Menu size={28} />
</button>
<div
  className={`fixed top-0 right-0 h-[50vh] w-5/6 max-w-sm
    bg-gradient-to-b from-pink-500 via-purple-600 to-indigo-700
    text-white shadow-2xl rounded-2xl border border-white/10
    overflow-auto transform transition-transform duration-300 ease-in-out z-50
    ${menuOpen ? "translate-x-0" : "translate-x-[120%]"}`
  }
>
  <div className="sticky top-0 bg-white/10 backdrop-blur-sm flex justify-between items-center p-4 rounded-t-2xl border-b border-white/20">
    <h2 className="text-lg font-semibold">Menu</h2>
    <button className="cursor-pointer" onClick={() => setMenuOpen(false)} aria-label="Close menu">
      <X size={24} />
    </button>
  </div>
  <div className="flex flex-col space-y-4 p-6 text-lg">
    {!user ? (
      <>
        <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Login</Link>
        <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Signup</Link>
      </>
    ) : (
      <>
        <Link to="/new" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Post Notice</Link>
        <Link to="/notices" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">All Notices</Link>
        {user.role === "admin" ? (
          <Link to="/dashboard/admin" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Admin Dashboard</Link>
        ) : (
          <Link to="/dashboard/user" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">User Dashboard</Link>
        )}
        <button
          onClick={handleLogout}
          className=" cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
        <NotificationBell />
      </>
    )}
  </div>
</div>

    </nav>
  );
}
