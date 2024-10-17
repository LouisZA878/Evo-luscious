import { create } from 'zustand';

const useFilter = create((set) => ({
    gender: "Man",
    age: "Toddler",
    size: "M",
    setGender: (gender) => set((state) => ({ ...state, gender })),
    setAge: (age) => set((state) => ({ ...state, age })),
    setSize: (size) => set((state) => ({ ...state, size })),
}));

export default useFilter;
