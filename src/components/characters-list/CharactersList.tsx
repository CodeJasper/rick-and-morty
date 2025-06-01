import { useEffect, useRef } from "react";
import type { Character } from "./types";
import { useInView } from "react-intersection-observer";

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
