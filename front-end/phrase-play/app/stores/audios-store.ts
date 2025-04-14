import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Audio {
  id: string;
  gradedReaderId: string;
  fileName: string;
  shortName: string;
  url: string;
  duration?: number;
  createdAt?: string;
  // ... other relevant properties
}

interface AudiosStoreState {
  audios: Audio[];
  isLoading: boolean;
  error: string | null;
}

interface AudiosStoreActions {
  setAudios: (audios: Audio[]) => void;
  getAllAudiosByGradedReaderId: (gradedReaderId: string) => Promise<void>;
  reset: () => void;
}

const initialState: AudiosStoreState = {
  audios: [],
  isLoading: false,
  error: null,
};

export const useAudiosStore = create<AudiosStoreState & AudiosStoreActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setAudios: (audios) => set({ audios }),
      
      getAllAudiosByGradedReaderId: async (gradedReaderId: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/file-audio/${gradedReaderId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              // credentials: 'include', // if needed for auth
            }
          );

          if (!res.ok) {
            throw new Error(`Failed to fetch audios: ${res.statusText}`);
          }

          const data: Audio[] = await res.json();
          set({ audios: data, isLoading: false });
        } catch (error) {
          console.error('Error fetching audios:', error);
          set({
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            isLoading: false,
          });
        }
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'audios-storage', // name for localStorage persistence
      // Optional: selectively persist only certain fields
      // partialize: (state) => ({ audios: state.audios }),
    }
  )
);

// Utility selector hooks
export const useAudios = () => useAudiosStore((state) => state.audios);
export const useAudioLoading = () => useAudiosStore((state) => state.isLoading);
export const useAudioError = () => useAudiosStore((state) => state.error);