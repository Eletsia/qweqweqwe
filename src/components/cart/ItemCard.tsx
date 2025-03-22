'use client';

import { CartItem } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';

/**
 * 장바구니의 아이템 하나를 보여주는 카드 컴포넌트
 */
export const ItemCard = ({ cartItem: { item, amount } }: { cartItem: CartItem }) => {
  const increment = cartStore((state) => state.increment);
  const decrement = cartStore((state) => state.decrement);

  /**
   * [+] 버튼 함수 핸들러
   */
  const handleUpAmount = () => {
    increment(item.id);
  };

  /**
   * [-] 버튼 함수 핸들러
   */
  const handleDownAmount = () => {
    if (amount <= 1) return;
    decrement(item.id);
  };

  return <></>;
};
