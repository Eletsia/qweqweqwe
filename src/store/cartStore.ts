import { CartStorageItem, Item } from '@/types/cartType';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CartStore = {
  /** 현재 저장된 장바구니 목록 */
  items: { [key: Item['id']]: number };

  /**
   * 장바구니에 아이템 추가 및 업데이트
   * @param newItem - 새로운 아이템
   */
  addItem: (newItem: CartStorageItem) => void;

  /**
   * 장바구니에서 아이템 삭제
   * @param idList - 삭제할 아이템의 id 리스트
   */
  removeItem: (idList: string[]) => void;

  /**
   * 아이템의 개수를 1 증가
   * @param itemId - 아이템의 id
   */
  increment: (itemId: number) => void;

  /**
   * 아이템의 개수를 1 감소
   * @param itemId - 아이템의 id
   */
  decrement: (itemId: number) => void;
};

/**
 * 장바구니 저장을 위한 스토어 생성
 * 장바구니 리스트를 전역적으로 관리하고 local storage에 저장합니다.
 */
export const cartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem: CartStorageItem) => {
        set((state) => {
          const amount = state.items[newItem.id];
          if (amount) {
            alert('동일한 상품이 장바구니에 있어 수량이 변경되었습니다.');
          }
          return { items: { ...state.items, [newItem.id]: newItem.amount + (amount || 0) } };
        });
      },

      removeItem: (idList: string[]) => {
        set((state) => {
          const items = { ...state.items };
          idList.forEach((id: string) => {
            delete items[parseInt(id)];
          });
          return { items };
        });
      },

      increment: (itemId: number) =>
        set((state) => {
          const currentQuantity = state.items[itemId];
          return {
            items: {
              ...state.items,
              [itemId]: currentQuantity + 1,
            },
          };
        }),

      decrement: (itemId: number) =>
        set((state) => {
          const currentQuantity = state.items[itemId];
          return {
            items: {
              ...state.items,
              [itemId]: currentQuantity - 1,
            },
          };
        }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
