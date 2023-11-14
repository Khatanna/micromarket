import { create } from 'zustand';
import { Product } from '../types';

type Modal = {
    title?: string, open: boolean; content?: React.FC<{ onClose: () => void }>
}

interface State {
    product?: Product;
    modal: Modal
}

interface Actions {
    setProduct: (product?: Product) => void
    setModal: (modal: Modal) => void
}

const initialState: State = {
    modal: {
        open: false
    }
}

export const useProductStore = create<State & Actions>()((set) => ({
    ...initialState,
    setProduct(product) {
        set({ product });
    },
    setModal(modal) {
        set({modal})
    },
}))