import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewNoteData } from '@/types/note';
import PERSISTED_KEYS from '@/const/zustandKeys';

type NoteDraftStore = {
  draftNote: NewNoteData;
  setDraftNote: (note: NewNoteData) => void;
  clearDraftNote: () => void;
};

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draftNote: initialDraft,
      setDraftNote: note => set(() => ({ draftNote: note })),
      clearDraftNote: () => set(() => ({ draftNote: initialDraft })),
    }),
    {
      name: PERSISTED_KEYS.NOTE_DRAFT,
      partialize: state => ({ draftNote: state.draftNote }),
    }
  )
);
