import { create } from 'zustand'

type AccountModalType = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const useAccountModal = create<AccountModalType>((set) => ({
    isOpen: false,
    setIsOpen: (open) => set({isOpen: open}),
}));