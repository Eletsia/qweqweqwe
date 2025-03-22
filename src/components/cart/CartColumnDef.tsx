import { CartItem } from '@/types/cartType';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
import { TableCell } from '../ui/table';
import Image from 'next/image';
import { formatNumber } from '@/utils/formatNumber';
import { AmountControlButton } from './AmountControlButton';

export const cartColumns: ColumnDef<CartItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="전체 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="m-2"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="행 선택"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'product',
    header: '상품',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <TableCell className="flex flex-row gap-2 py-5">
          <Image
            src={item.item.thumbnail}
            alt=""
            width={100}
            height={100}
            className="rounded-xl bg-gray-300"
          />
          <div className="flex max-h-[100px] flex-col items-start gap-2 p-1">
            <h3 className="truncate font-bold">{item.item.title}</h3>
            <p className="line-clamp-3 overflow-hidden text-gray-500">{item.item.content}</p>
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'price',
    header: '가격',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <TableCell className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.item.price)}원
        </TableCell>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: '수량',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <TableCell className="px-5">
          <AmountControlButton
            amount={item.amount}
            handleUpAmount={() => {}}
            handleDownAmount={() => {}}
          />
        </TableCell>
      );
    },
  },
  {
    id: 'total',
    header: '합계',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <TableCell className="whitespace-nowrap px-5 font-semibold">
          {formatNumber(item.item.price * item.amount)}원
        </TableCell>
      );
    },
  },
];
