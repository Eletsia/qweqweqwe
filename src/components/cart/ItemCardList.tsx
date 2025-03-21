'use client';

import { CartItem } from '@/types/cartType';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { ItemCard } from './ItemCard';
import { cartStore } from '@/store/cartStore';

/**
 * 장바구니 아이템 리스트를 보여주는 테이블 컴포넌트
 */
const CART_TABLE_HEADERS = [
  { id: 'product', label: '상품' },
  { id: 'price', label: '가격' },
  { id: 'quantity', label: '수량' },
  { id: 'total', label: '합계' },
];

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

  return (
    <div className="max-w-[1000px]">
      <Table>
        <TableHeader>
          <TableRow>
            {CART_TABLE_HEADERS.map((header) => (
              <TableHead key={header.id} className="text-center">
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {sampleItems.map((item) => (
          <TableBody key={item.item.id}>
            <ItemCard cartItem={item} />
          </TableBody>
        ))}
      </Table>
    </div>
  );
};
