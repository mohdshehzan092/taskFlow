import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/users/register", {
        fullName: fullName,
        email,
        password,
      }, {withCredentials: true});

      console.log("Registration response:", data);

      if (data.user) {
  localStorage.setItem("user", JSON.stringify(data.user));
  navigate("/dashboard");
} else {
  setError(data.message || "Registration failed");
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
        <h2 className="text-2xl font-medium text-center">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded p-2 text-center">
            {error}
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600 mb-1">Full Name</p>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;


