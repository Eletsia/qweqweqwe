'use client';

import { CartItem } from '@/types/type';
import { cartStore } from '@/store/cartStore';
import { Button } from '../ui/button';

/**
 * 장바구니 추가 버튼
 * @param item - 새로운 아이템
 * @example
 * ```tsx
 * <AddCartButton {...someItem} />
 * ```
 * 파라미터 item은 CartItem 타입만 지켜서 넣어주시면 됩니다.
 */
export const AddCartButton = (item: CartItem) => {
  const { addItem } = cartStore();

  const handleAddItemToCart = (item: CartItem) => {
    addItem(item);
  };

  return <Button onClick={() => handleAddItemToCart(item)}>장바구니 추가</Button>;
};
