import { Link } from "react-router-dom";
import type { CharacterListItem } from "./types";
import { FavoriteButton } from "../favorite-button/FavoriteButton";
import { useCharacterStore } from "../../store/useCharacterStore";

type CharacterCardProps = {
  character: CharacterListItem;
};

export const CharacterCard = (props: CharacterCardProps) => {
  const { character } = props;
  const { isFavorite, toggleFavorite } = useCharacterStore();

  return (
    <div className="relative">
      <FavoriteButton
        iconOnly
        className="absolute top-1 right-1"
        isFavorite={isFavorite(character.id)}
        handleToggleFavorite={() => toggleFavorite(character.id)}
      />
      <Link className="h-full" to={`/character/${character.id}`}>
        <div className="h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200">
          <img className="w-full object-cover" src={character.image} alt={character.name} />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 break-words text-center">{character.name}</h3>
            <p className="text-sm text-gray-600 text-center">Species: {character.species}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
