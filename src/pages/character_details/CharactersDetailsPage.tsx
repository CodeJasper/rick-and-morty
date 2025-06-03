import { useParams } from "react-router-dom";
import { CharacterDetails } from "../../components/character-details/CharacterDetails";
import { useGetCharacterByIdQuery } from "../../graphql/generated";
import type { CharacterDetail } from "../../components/character-details/types";

export const CharacterDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetCharacterByIdQuery({
    variables: { id: id ?? "" },
    skip: !id,
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error || !data?.character) return <p className="text-center mt-10 text-red-600">Character not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <CharacterDetails character={data.character as CharacterDetail} />
    </div>
  );
};
