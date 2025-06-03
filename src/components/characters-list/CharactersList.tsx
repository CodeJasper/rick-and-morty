import { useEffect, useRef } from "react";
import type { CharacterListItem } from "./types";
import { useInView } from "react-intersection-observer";
import { CharacterCard } from "./CharacterCard";

type CharacterListProps = {
  characters: CharacterListItem[];
  handleGetNextPage: () => void;
  allCharactersLoading: boolean;
};

export const CharactersList = (props: CharacterListProps) => {
  const { characters, handleGetNextPage, allCharactersLoading } = props;
  const { ref, inView } = useInView({ threshold: 1 });
  const isLockedRef = useRef<boolean>(false);

  useEffect(() => {
    if (inView && !isLockedRef.current) {
      isLockedRef.current = true;
      handleGetNextPage();
      setTimeout(() => {
        isLockedRef.current = false;
      }, 500);
    }
  }, [inView, handleGetNextPage]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {(characters.length > 0 && !allCharactersLoading) && (
        <div
          data-testid="sentinel"
          ref={ref}
          style={{ height: "1px", width: "100%", visibility: "hidden" }}
        />
      )}
    </>
  )
};
