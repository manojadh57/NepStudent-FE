import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/api";

// 🔁 Fetch comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    const res = await axios.get(`/comments/${postId}`);
    return { postId, comments: res.data.comments };
  }
);

// ✍️ Create comment
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ postId, content }) => {
    const res = await axios.post("/comments", { postId, content });
    return res.data.comment;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    byPost: {}, // { postId: [comments] }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.byPost[action.payload.postId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        const postId = action.payload.post;
        if (!state.byPost[postId]) state.byPost[postId] = [];
        state.byPost[postId].push(action.payload);
      });
  },
});

export default commentSlice.reducer;
