import { CharactersList } from "../../components/characters-list/CharactersList";
import type { Character } from "../../components/characters-list/types";
import { Loading } from "../../components/loading/Loading";
import { useGetCharactersQuery } from "../../graphql/generated"

export const CharactersListPage = () => {
  const { data, loading } = useGetCharactersQuery({
    variables: {
      page: 0
    }
  });

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <CharactersList characters={(data?.characters?.results) as Character[] }/>
    </div>
  )
}