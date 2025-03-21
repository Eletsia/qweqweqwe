import { CartItem } from '@/app/cart/type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartStore = {
  /** 현재 저장된 장바구니 목록 */
  items: CartItem[];

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
        const existingItemIndex = items.findIndex((item) => item.item.id === newItem.item.id);

        // 새로운 아이템일 경우 추가
        if (existingItemIndex === -1) {
          set({
            items: [...items, newItem],
          });
          // 이미 있는 아이템일 경우 아이템 개수만 업데이트
        } else {
          set({
            items: items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, amount: newItem.amount + item.amount }
                : item,
            ),
          });
        }
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
