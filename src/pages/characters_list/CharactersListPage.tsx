import { useEffect, useState } from "react";
import { CharactersList } from "../../components/characters-list/CharactersList";
import type { Character } from "../../components/characters-list/types";
import { useGetCharactersQuery } from "../../graphql/generated"

const ITEMS_PER_PAGE = 20;

export const CharactersListPage = () => {
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allCharactersCurrentPage, setAllCharactersCurrentPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetCharactersQuery({
    variables: {
      page: allCharactersCurrentPage
    }
  });

  useEffect(() => {
    const getCharacters = () => {
      const characters = data?.characters?.results as Character[];

      if(!characters) {
        return;
      }

      if(!currentCharacters.length) {
        setCurrentCharacters(characters)
      }

      if(data?.characters?.info?.next) {
        setAllCharactersCurrentPage((prev) => prev + 1)
      }

      setAllCharacters((prev) => [...prev, ...characters]);
    }

    getCharacters();
  }, [currentCharacters.length, data])

  const handleGetNextPage = () => {
    const newPage = currentPage + 1;
    const newCurrentCharacters = allCharacters.slice(0, (newPage * ITEMS_PER_PAGE));
    setCurrentCharacters(newCurrentCharacters);
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <CharactersList
        characters={currentCharacters}
        handleGetNextPage={handleGetNextPage}
      />
    </div>
  )
}