import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PostDetail from "./pages/PostDetail.jsx"; // ✅ now exists
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
