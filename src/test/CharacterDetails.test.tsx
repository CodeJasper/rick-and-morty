
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterDetails } from "../components/character-details/CharacterDetails";
import type { CharacterDetail } from "../components/character-details/types";
import type { FavoriteButtonProps } from "../components/favorite-button/FavoriteButton";
import { useCharacterStore } from "../store/useCharacterStore";

vi.mock("../components/favorite-button/FavoriteButton", () => ({
  FavoriteButton: ({ isFavorite, handleToggleFavorite }: FavoriteButtonProps) => (
    <button data-testid="fav-btn" onClick={() => handleToggleFavorite()}>
      {isFavorite ? "★ Favorite" : "☆ Add"}
    </button>
  ),
}));

vi.mock("../components/comments/CommentsSection", () => ({
  CommentsSection: () => <div data-testid="comments-section">comments</div>,
}));

vi.mock("../store/useCharacterStore", () => ({
  useCharacterStore: vi.fn(),
}));


const mockCharacter = {
  __typename: "Character",
  id: "1",
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  gender: "Male",
  origin: {
    __typename: "Location",
    name: "Earth"
  },
  location: {
    __typename: "Location",
    name: "Citadel of Ricks"
  },
  image: "https://test.png",
} satisfies CharacterDetail;

describe("CharacterDetails", () => {
  const toggleFavorite = vi.fn();

  beforeEach(() => {
    vi.mocked(useCharacterStore).mockReturnValue({
      isFavorite: () => true,
      toggleFavorite: toggleFavorite,
    });
  });

  it("show character data", () => {
    render(<CharacterDetails character={mockCharacter} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    let strongNode = screen.getByText("Status:");
    let parent = strongNode.closest("p");
    expect(parent).toHaveTextContent("Status: Alive");

    strongNode = screen.getByText("Gender:");
    parent = strongNode.closest("p");
    expect(parent).toHaveTextContent("Gender: Male");

    strongNode = screen.getByText("Origin:");
    parent = strongNode.closest("p");
    expect(parent).toHaveTextContent("Origin: Earth");

    strongNode = screen.getByText("Location:");
    parent = strongNode.closest("p");
    expect(parent).toHaveTextContent("Location: Citadel of Ricks");

    strongNode = screen.getByText("Species:");
    parent = strongNode.closest("p");
    expect(parent).toHaveTextContent("Species: Human");
  });

  it("call to toggleFavorite when favorite button is clicked", () => {
    render(<CharacterDetails character={mockCharacter} />);
    const favBtn = screen.getByTestId("fav-btn");
    fireEvent.click(favBtn);
    expect(toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("render comments section", () => {
    render(<CharacterDetails character={mockCharacter} />);
    expect(screen.getByTestId("comments-section")).toBeInTheDocument();
  });
});
