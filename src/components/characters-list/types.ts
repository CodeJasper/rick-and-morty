import type { CharacterListItemFieldsFragment } from "../../graphql/generated";


export type CharacterListItem = {
  [K in keyof CharacterListItemFieldsFragment]-?: NonNullable<CharacterListItemFieldsFragment[K]>;
};