import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://todobackend-6v52.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(data.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-orange-50 rounded-lg border border-orange-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-600">
        Signup
      </h2>
      {message && (
        <div className="mb-3 text-center text-red-600 font-semibold">
          {message}
        </div>
      )}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-3 border-2 border-orange-300 rounded w-full mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 border-2 border-orange-300 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Signup
        </button>
      </form>
      <div className="mt-5 text-center text-gray-700">
        Already have an account?
        <Link to="/login">
          <span className="text-orange-500 hover:underline font-semibold">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
