import { create } from 'zustand'

const useSearch = create((set) => ({
    search: '',
    searchInput: (text) => set({ search: text }),
  }));

export default useSearch