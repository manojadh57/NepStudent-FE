import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./styles/tokens.reddit.css";
import "./styles/reddit.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </GoogleOAuthProvider>
);
