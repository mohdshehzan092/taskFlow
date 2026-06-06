import { useNavigate } from "react-router-dom";
import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import API from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
    } catch (_) {}
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaTasks className="text-indigo-600 text-xl" />
          <span className="text-lg font-bold text-gray-800">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">
            👋 {user.fullName || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-2 rounded-xl transition-colors"
          >
            <FaSignOutAlt />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>

      </div>
      <div className="h-0.5 bg-linear-to-r from-indigo-500 via-purple-400 to-pink-400" />
    </nav>
  );
};

export default Navbar;