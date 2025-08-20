// TEACHER NOTE:
// - normalizeAuthor() reads username from multiple shapes (populated or not).
// - After createPost, we inject current user's username so UI shows instantly.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/api";

function normalizeAuthor(p) {
  const username =
    p?.user?.username || // preferred: populated by backend
    p?.username || // sometimes APIs flatten this
    p?.author || // legacy/alternate
    "anonymous";
  return { ...p, __author: username }; // __author = UI-friendly field
}

export const fetchPosts = createAsyncThunk("posts/fetch", async (page = 1) => {
  const { data } = await api.get(`/posts?page=${page}`);
  const list = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];
  return list.map(normalizeAuthor);
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ title, body }) => {
    const { data } = await api.post("/posts", { title, body });
    return data.post || data; // handle both shapes
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: { items: [], loading: false, error: "" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (s) => {
      s.loading = true;
      s.error = "";
    });
    b.addCase(fetchPosts.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchPosts.rejected, (s, a) => {
      s.loading = false;
      s.error = a.error.message;
    });

    b.addCase(createPost.fulfilled, (s, a) => {
      const serverPost = a.payload;

      // 1) read "me" from localStorage (set by authSlice on login)
      const me = (() => {
        try {
          return JSON.parse(localStorage.getItem("user") || "null");
        } catch {
          return null;
        }
      })();

      // 2) patch username so UI never shows "anonymous" after creating
      const patched = {
        ...serverPost,
        user: {
          ...(serverPost.user || {}),
          username: me?.username || serverPost?.user?.username,
        },
      };

      // 3) normalize and prepend
      s.items = [normalizeAuthor(patched), ...s.items];
    });
  },
});

export default postSlice.reducer;
