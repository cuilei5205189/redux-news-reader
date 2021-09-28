import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentIsPending,postCommentForArticleId,loadCommentsForArticleId } from "../features/comments/commentsSlice";

export default function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  // Declare isCreatePending here.
  const isCreatePending = useSelector(createCommentIsPending) 
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch your asynchronous action here!
    dispatch(postCommentForArticleId({comment, articleId}))
    // dispatch(loadCommentsForArticleId(articleId))
    setComment("");
  };



  return (
    <form onSubmit={handleSubmit}>
      <label for="comment" className="label">
        Add Comment:
      </label>
      <div id="input-container">
        <input
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          type="text"
        />
        <button disabled={isCreatePending} className="comment-button">Submit</button>
      </div>
    </form>
  );
}
