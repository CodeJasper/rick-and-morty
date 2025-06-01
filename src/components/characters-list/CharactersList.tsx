import type { Character } from "./types";

type CharacterListProps = {
  characters: Character[];
}

export const CharactersList = ({ characters }: CharacterListProps) => {
  return (
    <>
      {characters.map((character) => {
        return (
          <div key={character.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src={character.image || ''} alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{character?.name}</h5>
                <p className="mb-2 text-sm text-black">Species: {character?.species}</p>
              </a>
            </div>
        </div>
        )
      })}
    </>
  )
}