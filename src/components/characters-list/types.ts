import { type CharacterFieldsFragment } from "../../graphql/generated"

export type Character = {
  [K in keyof CharacterFieldsFragment]-?: NonNullable<CharacterFieldsFragment[K]>;
};