import { type Comment } from './type';

type CommentsListProps = {
  comments: Comment[];
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm italic">There are not comments available.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-800 shadow-sm"
            >
              {comment.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
