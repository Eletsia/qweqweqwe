'use client';

import { ItemCardList } from '@/components/cart/ItemList';
import { QueryProvider } from '../provider';

export default function CartPage() {
  return (
    <QueryProvider>
      <div className="flex flex-col items-center gap-5 p-10">
        <h2 className="text-2xl font-bold">장바구니</h2>
        <ItemCardList />
      </div>
    </QueryProvider>
  );
}
