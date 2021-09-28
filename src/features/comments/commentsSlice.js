// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (id, thunkAPI) => {
    const response = await fetch(`api/articles/${id}/comments`);
    const json = await response.json();
    return json;
  }
)

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({comment,articleId}, thunkAPI) => {
    const url = `api/articles/${articleId}/comments`
    const data = JSON.stringify({"comment": comment})
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
)

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byArticleId: [],
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false
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
      })
      .addCase(postCommentForArticleId.pending, (state, action)=>{
        state.createCommentIsPending = true 
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action)=>{
        state.createCommentIsPending = false
        state.byArticleId[action.payload.articleId].push(action.payload)
      })
      .addCase(postCommentForArticleId.rejected, (state)=>{
        state.failedToCreateComment = true
      })
  }
});

export const selectComments = (state) => {
  return state.comments.byArticleId
};
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
