import { useEffect, useState } from "react";
import { CharactersList } from "../../components/characters-list/CharactersList";
import type { Character } from "../../components/characters-list/types";
import { Loading } from "../../components/loading/Loading";
import { useGetCharactersQuery } from "../../graphql/generated"

export const CharactersListPage = () => {
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([]);
  const [, setAllCharacters] = useState<Character[]>([]);
  const [allCharactersCurrentPage, setAllCharactersCurrentPage] = useState(0);
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

      if(data?.characters?.info?.pages) {
        setAllCharactersCurrentPage((prev) => prev + 1)
      }

      setAllCharacters((prev) => [...prev, ...characters]);
    }

    getCharacters();
  }, [currentCharacters.length, data])

  if(!currentCharacters.length) {
    return (
      <Loading />
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <CharactersList characters={currentCharacters}/>
    </div>
  )
}