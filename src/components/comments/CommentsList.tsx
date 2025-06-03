import { useParams } from 'react-router-dom';
import { useCharacterStore } from '../../store/useCharacterStore';
import { type Comment } from '../../components/comments/type'

export const CommentsList = () => {
  const { id } = useParams<{ id: string }>();
  const { getComments } = useCharacterStore();
  let comments: Comment[] = [];

  if(id) {
    comments = getComments(id);
  }

  return (
    <>
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm italic">There are not comments available.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map(({id, text}) => (
            <li
              key={id}
              className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-800 shadow-sm"
            >
              {text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
