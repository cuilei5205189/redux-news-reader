// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id, thunkAPI) => {
    console.log('sdfasdfasf')
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }
)

// Create postCommentForArticleId here.

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byArticleId: [],
    isLoadingComments: false,
    failedToLoadComments: false,
    // Add initial state properties here.
  },
  // Add extraReducers here.
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForArticleId.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
        state.byArticleId[action.payload.articleId] = action.payload.comments;
      })
      .addCase(loadCommentsForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
        state.byArticleId = {};
      })
  }
});

export const selectComments = (state) => {
  console.log(state.comments)
  return state.comments.byArticleId
};
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
