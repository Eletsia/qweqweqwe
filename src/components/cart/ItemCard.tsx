'use client';

import Image from 'next/image';
import { TableCell, TableRow } from '../ui/table';
import { AmountControlButton } from './AmountControlButton';
import { formatNumber } from '@/utils/formatNumber';
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

  return (
    <>
      <TableRow>
        <TableCell className="flex flex-row gap-2 py-5">
          <Image
            src={item.thumbnail}
            alt=""
            width={100}
            height={100}
            className="rounded-xl bg-gray-300"
          />
          <div className="flex max-h-[100px] flex-col gap-2 p-1">
            <h3 className="truncate font-bold">{item.title}</h3>
            <p className="line-clamp-3 overflow-hidden text-gray-500">{item.content}</p>
          </div>
        </TableCell>
        <TableCell className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.price)}원
        </TableCell>
        <TableCell className="px-5">
          <AmountControlButton
            amount={amount}
            handleUpAmount={handleUpAmount}
            handleDownAmount={handleDownAmount}
          />
        </TableCell>
        <TableCell className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.price * amount)}원
        </TableCell>
      </TableRow>
    </>
  );
};
