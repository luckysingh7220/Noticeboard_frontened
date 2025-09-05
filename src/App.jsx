import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import NoticeForm from "./components/NoticeForm";
import NoticeList from "./components/NoticeList";
import EditNotice from "./pages/EditNotice";
import NotificationsPage from "./pages/NotificationPage";
import SingleNotice from "./components/SingleNotice";
import Footer from "./pages/Footer";

function App() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always at top */}
      <Navbar />

      {/* Main content grows to push footer down */}
      <main className="flex-grow">
        <Routes>
          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={`/dashboard/${user.role}`} />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to={`/dashboard/${user.role}`} />}
          />

          {/* User Dashboard */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Notices */}
          <Route path="/new" element={<NoticeForm />} />
          <Route path="/notices" element={<NoticeList />} />
          <Route path="/notices/edit/:id" element={<EditNotice />} />
          <Route path="/notices/:id" element={<SingleNotice />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer always sticks to bottom */}
      <Footer />
    </div>
  );
}

export default App;
