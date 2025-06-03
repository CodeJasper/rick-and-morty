import { useState } from "react";
import { CommentsList } from "./CommentsList";
import { type Comment } from './type';

export const CommentsSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = () => {
    if (comment.trim() === "") return;
    setComments((prev) => [...prev, {text: comment.trim(), id: crypto.randomUUID()}]);
    setComment("");
  };

  return (
    <div className="mt-10 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Comments
      </h3>

      <div className="flex flex-col items-end gap-3 mb-6">
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Write what you think about this character..."
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          disabled={!comment}
          onClick={handleAddComment}
          className="disabled:bg-blue-400 disabled:cursor-default hover:cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Comment
        </button>
      </div>

      <CommentsList comments={comments} />
    </div>
  );
};
