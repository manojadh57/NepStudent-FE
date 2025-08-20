import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/api";

// Existing fetchPosts thunk
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("/posts");
  return res.data.posts;
});

// ✅ NEW: Create Post thunk
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/posts", postData);
      return res.data.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // Add new post to top
      });
  },
});

export default postSlice.reducer;
