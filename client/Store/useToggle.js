import { create } from 'zustand'

const useToggle = create((set) => ({
  status: true,
  toggleStatus: () => set((state) => ({ status: !state.status })),

}))

export default useToggle