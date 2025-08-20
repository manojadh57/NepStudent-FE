// TEACHER NOTE:
// On login we persist both accessToken and user (must include `username`).
// This mirrors our eCommerce flow.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/api";

export const login = createAsyncThunk("auth/login", async (payload) => {
  // payload example: { email, password }
  const { data } = await api.post("/auth/login", payload);
  // EXPECTED: { user: { _id, username, email, ... }, accessToken: "..." }

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  return true;
});

const userFromLS = (() => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromLS, // { _id, username, ... } if already logged in
    accessToken: localStorage.getItem("accessToken") || "",
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = "";
    });
    b.addCase(login.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload.user;
      s.accessToken = a.payload.accessToken;
    });
    b.addCase(login.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message;
    });
    b.addCase(logout.fulfilled, (s) => {
      s.user = null;
      s.accessToken = "";
    });
  },
});

export default authSlice.reducer;
