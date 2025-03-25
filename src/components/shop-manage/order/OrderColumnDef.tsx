import { ColumnDef } from '@tanstack/react-table';
import { ORDER_STATUS, OrderedItem, OrderStatus } from './temp';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/** 주문 상품 테이블 컬럼 데이터 */
export const orderedColumns: ColumnDef<OrderedItem>[] = [
  {
    id: 'orderId',
    header: '주문번호',
    cell: ({ row }) => {
      const item = row.original;

      return <div className="whitespace-nowrap px-5 text-center">{item.order_id}</div>;
    },
  },
  {
    id: 'product',
    header: '상품',
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-row gap-2 py-5">
          <Image src="" alt="" width={100} height={100} className="rounded-xl bg-gray-300" />
          <div className="flex max-h-[100px] flex-col items-start gap-2 p-1">
            <h3 className="truncate font-bold">{item.item.title}</h3>
            <p className="line-clamp-3 overflow-hidden text-gray-500">{item.item.content}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'amount',
    header: '수량',
    cell: ({ row }) => {
      const item = row.original;

      return <div className="whitespace-nowrap px-5 text-center">{item.amount}</div>;
    },
  },
  {
    id: 'status',
    header: '상태',
    cell: ({ row }) => {
      const item = row.original;
      const status: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

      const handleStatusChange = (value: OrderStatus) => {
        // 상품 상태 변경 로직
        console.log('value ➡️', value);
      };

      return (
        <div className="flex justify-center p-2">
          <div className="w-[120px]">
            <Select
              defaultValue={item.order_status}
              onValueChange={(value: OrderStatus) => handleStatusChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                {status.map((s: OrderStatus) => (
                  <SelectItem key={s} value={s}>
                    {ORDER_STATUS(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        // <div className="whitespace-nowrap px-5 text-center">{ORDER_STATUS(item.order_status)}</div>
      );
    },
  },
];
