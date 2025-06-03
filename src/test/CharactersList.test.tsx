import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CharactersList } from '../components/characters-list/CharactersList';
import type { CharacterListItem } from '../components/characters-list/types';
import { MemoryRouter } from 'react-router-dom';
import type { CharacterCardProps } from '../components/characters-list/CharacterCard';


vi.mock('../components/characters-list/CharacterCard', () => ({
  CharacterCard: ({ character }: CharacterCardProps) => (
    <div data-testid="character-card">{character.name}</div>
  )
}));

  vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}));

const mockCharacters = [
  {
    __typename: "Character",
    id: "1",
    name: "test 1 name",
    image: "https://test_1.png",
    species: "test 1 species"
  },
  {
    __typename: "Character",
    id: "2",
    name: "test 2 name",
    image: "https://test_2.png",
    species: "test 2 species"
  },
] satisfies CharacterListItem[];

describe('CharactersList', () => {
  let handleGetNextPage: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleGetNextPage = vi.fn();
  });

  it('render grid with characters', () => {
    render(
      <MemoryRouter>
        <CharactersList
          characters={mockCharacters}
          handleGetNextPage={handleGetNextPage}
          allCharactersLoading={false}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('character-card')).toHaveLength(2);
    expect(screen.getByText('test 1 name')).toBeInTheDocument();
    expect(screen.getByText('test 2 name')).toBeInTheDocument();
  });

  it('call handleGetNextPage when sentinel is', () => {
    render(
      <MemoryRouter>
        <CharactersList
          characters={mockCharacters}
          handleGetNextPage={handleGetNextPage}
          allCharactersLoading={false}
        />
      </MemoryRouter>
    );

    expect(handleGetNextPage).toHaveBeenCalledTimes(1);
  });

  it('Not render sentilen if it is loading', () => {
    render(
      <MemoryRouter>
        <CharactersList
          characters={mockCharacters}
          handleGetNextPage={handleGetNextPage}
          allCharactersLoading={true}
        />
      </MemoryRouter>
    );

    const sentinel = screen.queryByTestId('sentinel');
    expect(sentinel).not.toBeInTheDocument();
  });
});
