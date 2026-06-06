import { FaTasks, FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      {/* Top divider accent */}
      <div className="h-0.5 bg-linear-to-r from-indigo-500 via-purple-400 to-pink-400" />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left — Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FaTasks className="text-white text-xs" />
            </div>
            <span className="font-bold text-gray-800 text-sm">TaskFlow</span>
            <span className="text-gray-300 text-xs">|</span>
            <span className="text-gray-400 text-xs">© {year} All rights reserved</span>
          </div>

          {/* Center — Stack badges */}
          <div className="flex items-center gap-2">
            {["MongoDB", "Express", "React", "Node"].map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Right — Made with love */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>Made with</span>
            <FaHeart className="text-red-400 text-xs" />
            <span>using MERN</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;