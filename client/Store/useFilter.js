import { create } from 'zustand';

const useFilter = create((set) => ({
    gender: "M",
    age: "Toddler",
    size: "SM",
    clothingType: "Bundle",
    page: 1,
    setGender: (gender) => set((state) => ({ ...state, gender })),
    setPage: (page) => set((state) => ({ ...state, page })),
    setAge: (age) => set((state) => ({ ...state, age })),
    setSize: (size) => set((state) => ({ ...state, size })),
    setClothingType: (clothingType) => set((state) => ({ ...state, clothingType }))
}));

export default useFilter;
