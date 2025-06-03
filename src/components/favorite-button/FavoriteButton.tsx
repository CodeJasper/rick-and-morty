type FavoriteButtonProps = {
  iconOnly?: boolean;
  className?: string;
  isFavorite: boolean;
  handleToggleFavorite: () => void;
}

export const FavoriteButton = (props: FavoriteButtonProps) => {
  const { iconOnly = false, className = '', isFavorite, handleToggleFavorite } = props;

  return (
    <button
      onClick={() => handleToggleFavorite()}
      className={`${className} ${iconOnly? 'w-8 h-8 rounded-full flex justify-center' :'px-4 py-2'} text-nowrap hover:cursor-pointer flex items-center gap-2 rounded-full text-sm font-medium transition 
        ${isFavorite ? "bg-yellow-400 text-white hover:bg-yellow-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
      `}
    >
      <span>{isFavorite ? "★" : "☆"}</span>
      {!iconOnly && (
        <span>{isFavorite ? "Favorite" : "Add to favorites"}</span>
      )}
    </button>
  );
};