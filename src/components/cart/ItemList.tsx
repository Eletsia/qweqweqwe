'use client';

import { Item } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';
import { cartColumns } from './CartColumnDef';
import { DataTable } from './CartDataTable';
import { useEffect, useState } from 'react';
import { getItemDetails } from '@/api/itemApi';

/** 장바구니 아이템 리스트 컴포넌트 */
export const ItemCardList = () => {
  const itemIds = cartStore((state) => state.itemIds);
  const [cartItems, setCartItems] = useState<Item[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 아이템 종류가 달라질 때만 새로 업데이트
  useEffect(() => {
    const getItemDetailList = async () => {
      try {
        setIsLoading(true);
        const items: Item[] = await getItemDetails(itemIds);
        setCartItems(items);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    };

    getItemDetailList();
  }, [itemIds]);

  if (!cartItems || isLoading) return <div className="p-5 text-gray-500">로딩중입니다...</div>;

  return <DataTable columns={cartColumns} data={cartItems} />;
};
