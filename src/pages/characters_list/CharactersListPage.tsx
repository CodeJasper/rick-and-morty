import { useEffect, useState } from "react";
import { CharactersList } from "../../components/characters-list/CharactersList";
import type { Character } from "../../components/characters-list/types";
import { useGetCharactersQuery } from "../../graphql/generated"
import { Loading } from "../../components/loading/Loading";

const ITEMS_PER_PAGE = 20;

type Sorting = 'asc' | 'desc';

export const CharactersListPage = () => {
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<Sorting | undefined>();
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [allCharactersCurrentPage, setAllCharactersCurrentPage] = useState(1);
  const [allCharactersLoading, setAllCharactersLoading] = useState(true);

  const { data } = useGetCharactersQuery({
    variables: {
      page: allCharactersCurrentPage
    }
  });

  const sortByName = (characters: Character[], sort: Sorting) => {
    if(sort === 'asc') {
      return [...characters].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...characters].sort((a, b) => b.name.localeCompare(a.name));
  }

  useEffect(() => {
    const getCharacters = () => {
      const characters = data?.characters?.results as Character[];
      if(!characters || !allCharactersLoading) {
        return;
      }

      if(!currentCharacters.length) {
       setCurrentCharacters(characters.slice(0, ITEMS_PER_PAGE));
      }

      if(data?.characters?.info?.next) {
        setAllCharactersCurrentPage((prev) => prev + 1)
      } else {
        setAllCharactersLoading(false);
      }

      setAllCharacters((prev) => [...prev, ...characters]);
    }

    getCharacters();
  }, [data, allCharactersLoading, currentCharacters.length])

  const handleGetNextPage = () => {
    if(allCharactersLoading) {
      return;
    }

    const newPage = currentPage + 1;
    const newCurrentCharacters = allCharacters.slice(0, (newPage * ITEMS_PER_PAGE));
    setCurrentCharacters(newCurrentCharacters);
    setCurrentPage((prev) => prev + 1);
  }

  const handleSortByName = () => {
    let newAllCharacters: Character[];
    let newSorting: Sorting | undefined;
    if(currentSort === 'asc') {
      newAllCharacters = sortByName(allCharacters, 'desc');
      newSorting = 'desc';
    } else {
      newAllCharacters = sortByName(allCharacters, 'asc');
      newSorting = 'asc';
    }

    const newCurrentCharacters = newAllCharacters.slice(0, ITEMS_PER_PAGE);

    setCurrentSort(newSorting);
    setAllCharacters(newAllCharacters);
    setCurrentPage(1);
    setCurrentCharacters(newCurrentCharacters);
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Rick and Morty Characters</h1>
      <div className="flex justify-end mb-4">
        <button
          title={allCharactersLoading ? 'Synchronizing data...' : 'Sort by Name'}
          onClick={handleSortByName}
          disabled={allCharactersLoading}
          className="disabled:bg-blue-400 disabled:cursor-default flex gap-4 items-center bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sort by Name {currentSort === 'asc' ? 'Z-A' : 'A-Z'}
          {allCharactersLoading &&  <Loading />}
        </button>
      </div>
      <CharactersList
        characters={currentCharacters}
        handleGetNextPage={handleGetNextPage}
        allCharactersLoading={allCharactersLoading}
      />
      {(allCharactersLoading || !currentCharacters.length)&& (
        <div className="flex items-center gap-5 justify-center mt-4 text-gray-500">Synchronizing data <Loading /></div>
      )}
    </>
  )
}