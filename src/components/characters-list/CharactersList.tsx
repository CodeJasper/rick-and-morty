import { useEffect, useRef } from "react";
import type { Character } from "./types";
import { useInView } from "react-intersection-observer";
import { CharacterCard } from "./CharacterCard";

type CharacterListProps = {
  characters: Character[];
  handleGetNextPage: () => void;
};

export const CharactersList = (props: CharacterListProps) => {
  const { characters, handleGetNextPage } = props;
  const { ref, inView } = useInView({ threshold: 1 });
  const isLockedRef = useRef<boolean>(false);
  const hasMountedRef = useRef<boolean>(false);

  useEffect(() => {
    if (inView && !isLockedRef.current) {
      if(hasMountedRef.current) {
        isLockedRef.current = true;
        handleGetNextPage();
        setTimeout(() => {
          isLockedRef.current = false;
        }, 1000);
      }  else {
        hasMountedRef.current = true;
      }
    }
  }, [inView, handleGetNextPage]);

  return (
    <>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}

      {characters.length > 0 && (
        <div
          ref={ref}
          style={{ height: "1px", width: "100%", visibility: "hidden" }}
        />
      )}
    </>
  );
};
