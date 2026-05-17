import { create } from 'zustand'

export const useAppStore = create((set) => ({
  authReady: false,
  session: null,
  user: null,
  theme: localStorage.getItem('vyralink-theme') || 'dark',
  transcriptHistory: [],
  setAuth: ({ session, user }) => set({ authReady: true, session, user }),
  clearAuth: () => set({ authReady: true, session: null, user: null }),
  setTranscriptHistory: (transcriptHistory) => set({ transcriptHistory }),
  addTranscript: (transcript) =>
    set((state) => ({ transcriptHistory: [transcript, ...state.transcriptHistory].slice(0, 8) })),
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('vyralink-theme', theme)
      document.documentElement.classList.toggle('light', theme === 'light')
      return { theme }
    }),
}))
