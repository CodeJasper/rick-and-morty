import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Comment} from '../components/comments/type';

interface CharacterStoreProps {
  favorites: string[];
  comments: Record<string, Comment[]>;

  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  addComment: (id: string, comment: Comment) => void;
  getComments: (id: string) => Comment[];
}

export const useCharacterStore = create<CharacterStoreProps>()(
  persist(
    (set, get) => ({
      favorites: [],
      comments: {},
      toggleFavorite: (id) => {
        const current = get().favorites;
        const updated = current.includes(id)
          ? current.filter((favId) => favId !== id)
          : [...current, id];
        set({ favorites: updated });
      },
      isFavorite: (id) => {
        const current = get().favorites;
        return current.includes(id)
      },
      addComment: (id, comment) => {
        const current = get().comments;
        const updated = {
          ...current,
          [id]: [...(current[id] || []), comment],
        };
        set({ comments: updated });
      },
      getComments: (id) => {
        const current = get().comments;
        return current[id] || [];
      }
    }),
    {
      name: 'character-storage',
    }
  )
);
