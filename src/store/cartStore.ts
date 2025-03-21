import { CartItem } from '@/types/type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartStore = {
  /** 현재 저장된 장바구니 목록 */
  items: { [key: number]: number };

  /**
   * 장바구니에 아이템 추가 및 업데이트
   * @param newItem - 새로운 아이템
   */
  addItem: (newItem: CartItem) => void;
};

/**
 * 장바구니 저장을 위한 스토어 생성
 * 장바구니 리스트를 전역적으로 관리하고 local storage에 저장합니다.
 */
export const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem: CartItem) => {
        const items = get().items;
        const amount = items[newItem.id];
        if (amount) {
          alert('동일한 상품이 장바구니에 있어 수량이 변경되었습니다.');
        }
        set({ items: { ...items, [newItem.id]: newItem.amount + (amount || 0) } });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
