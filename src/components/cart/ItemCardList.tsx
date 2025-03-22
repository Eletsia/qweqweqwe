'use client';

import { CartItem } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';
import { DataTable } from '../shop-manage/data-table';
import { cartColumns } from './CartColumnDef';

export const ItemCardList = () => {
  const items = cartStore((state) => state.items);

  // TODO : 객체를 순회하면서 DB에서 아이템에 대한 정보 가져오기
  // 변환하는 로직 추가 예정이며 아래 간단한 배열 변환 로직으로 대체합니다.
  const sampleItems: CartItem[] = Object.entries(items).map(([key, value]: [string, number]) => {
    const item = {
      id: parseInt(key),
      sellerId: 2,
      title: '아이템 이름',
      content:
        '아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다. 아이템에 대한 설명입니다.',
      price: 10000,
      stock: 3,
      thumbnail: '',
    };
    const amount = value;
    return { item, amount };
  });

  return <DataTable columns={cartColumns} data={sampleItems} />;
};
