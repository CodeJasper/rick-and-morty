import { Link } from "react-router-dom";
import type { CharacterListItem } from "./types";

type CharacterCardProps = {
  character: CharacterListItem;
};

export const CharacterCard = (props: CharacterCardProps) => {
  const { character } = props;

  return (
    <Link to={`/character/${character.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200">
        <img className="w-full object-cover" src={character.image} alt={character.name} />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 break-words text-center">{character.name}</h3>
          <p className="text-sm text-gray-600 text-center">Species: {character.species}</p>
        </div>
      </div>
    </Link>
  );
};
