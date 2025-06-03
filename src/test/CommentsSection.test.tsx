import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommentsSection } from "../components/comments/CommentsSection";
import { useCharacterStore } from "../store/useCharacterStore";

vi.mock("../store/useCharacterStore", () => ({
  useCharacterStore: vi.fn(),
}));

vi.mock("../components/comments/CommentsList", () => ({
  CommentsList: () => <div data-testid="comments-list">List</div>,
}));

vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

describe("CommentsSection", () => {
  const addComment = vi.fn();

  beforeEach(() => {
    vi.mocked(useCharacterStore).mockReturnValue({
      addComment: addComment,
    });
    addComment.mockClear();
  });

  it("renders textarea, button and comments list", () => {
    render(<CommentsSection />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /comment/i })).toBeInTheDocument();
    expect(screen.getByTestId("comments-list")).toBeInTheDocument();
  });

  it("does not call addComment when textarea is empty", () => {
    render(<CommentsSection />);
    fireEvent.click(screen.getByRole("button", { name: /comment/i }));
    expect(addComment).not.toHaveBeenCalled();
  });

  it("calls addComment with text and random id when filled", () => {
    render(<CommentsSection />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Great character" } });

    const button = screen.getByRole("button", { name: /comment/i });
    fireEvent.click(button);

    expect(addComment).toHaveBeenCalledTimes(1);

    const [idArg, commentArg] = addComment.mock.calls[0];
    expect(idArg).toBe("1");
    expect(commentArg.text).toBe("Great character");
    expect(commentArg.id).toBeDefined();
    expect(typeof commentArg.id).toBe("string");
  });
});
