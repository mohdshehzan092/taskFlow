import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/users/login", { email, password });

      if (data.user) {
  localStorage.setItem("user", JSON.stringify(data.user));
  navigate("/dashboard");

      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 p-8 w-80 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-medium text-center">Login</h2>

        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded p-2 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="border rounded w-full p-2 disabled:opacity-50"
          />
        </div>

        {/* Password */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="border rounded w-full p-2 pr-10 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-500">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-blue-500 hover:underline cursor-pointer"
  >
    Register
  </span>
</p>
      </form>
    </div>
  );
};

export default Login;
