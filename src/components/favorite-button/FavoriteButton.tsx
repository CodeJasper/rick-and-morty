import { useState } from "react";

export const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false)
  return (
    <button
      onClick={() => setIsFavorite((prev) => !prev)}
      className={`text-nowrap hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition 
        ${isFavorite ? "bg-yellow-400 text-white hover:bg-yellow-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
      `}
    >
      {isFavorite ? "★ Favorite" : "☆ Add to favorites"}
    </button>
  );
};