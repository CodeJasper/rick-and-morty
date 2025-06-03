import { FavoriteButton } from "../favorite-button/FavoriteButton";
import type { CharacterDetail } from "./types";

type CharacterDetailProps = {
  character: CharacterDetail;
};

export const CharacterDetails = ({ character }: CharacterDetailProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={character.image ?? ""}
          alt={character.name ?? ""}
          className="w-64 h-64 object-cover rounded-lg border"
        />
        <div className="grow">
          <div className="mb-6 flex gap-2 flex-col lg:gap-6 lg:flex-row items-start justify-between">
            <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
            <FavoriteButton />
          </div>
          <p className="text-gray-600 mb-1"><strong>Species:</strong> {character.species}</p>
          <p className="text-gray-600 mb-1"><strong>Status:</strong> {character.status}</p>
          <p className="text-gray-600 mb-1"><strong>Gender:</strong> {character.gender}</p>
          <p className="text-gray-600 mb-1"><strong>Origin:</strong> {character.origin?.name}</p>
          <p className="text-gray-600 mb-1"><strong>Location:</strong> {character.location?.name}</p>
        </div>
      </div>
    </div>
  );
};
