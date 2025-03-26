'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { OrderedItem } from '@/types/orderType';
import { formatNumber } from '@/utils/formatNumber';
import { Row } from '@tanstack/react-table';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { OrderStatusContainer } from './OrderStatusButton';

type ItemModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedRow: Row<OrderedItem> | null;
};

/** 주문 정보 디테일을 확인할 수 있는 모달 */
export const ItemModal = ({ open, setOpen, selectedRow }: ItemModalProps) => {
  if (!selectedRow) {
    setOpen(false);
    return;
  }
  const item = selectedRow.original;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-6 p-10 text-sm">
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">상품 정보</h4>
          <div className="flex flex-row gap-2">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src={item.item.thumbnail}
                alt={item.item.title}
                fill
                className="rounded-xl bg-gray-300 object-cover"
              />
            </div>
            <div className="flex max-h-[100px] flex-col items-start gap-2 p-1">
              <h3 className="truncate font-bold">{item.item.title}</h3>
              <p className="line-clamp-3 overflow-hidden text-gray-500">{item.item.content}</p>
            </div>
          </div>
          <span className="w-full text-center text-lg font-semibold">
            남은 재고: {formatNumber(item.item.stock)}
          </span>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">주문 정보</h4>
          <div className="flex flex-row gap-5">
            <ul className="flex flex-col gap-2 text-gray-500">
              <li>주문 번호</li>
              <li>주문 일자</li>
              <li>주문자 정보</li>
              <li>수량</li>
            </ul>
            <ul className="flex flex-col gap-2 font-semibold">
              <li>{item.order_id}</li>
              <li>{item.created_at}</li>
              <li>닉네임 (email@email.com)</li>
              <li>{item.amount}</li>
            </ul>
          </div>
          <OrderStatusContainer item={item} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
