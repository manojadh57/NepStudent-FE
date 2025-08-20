import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // optional: console.log("id_token", credential, jwtDecode(credential));
      const { data } = await api.post("/auth/google", { token: credential });
      login(data); // {accessToken, refreshToken, username}
      nav("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow p-6 text-center">
        <h1 className="text-xl font-semibold mb-3">
          Welcome to NepStudent Forum
        </h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue</p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => alert("Login failed")}
          />
        </div>
      </div>
    </div>
  );
}
