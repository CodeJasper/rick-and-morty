import type { CharacterDetailFieldsFragment } from "../../graphql/generated";


export type CharacterDetail = {
  [K in keyof CharacterDetailFieldsFragment]-?: NonNullable<CharacterDetailFieldsFragment[K]>;
};