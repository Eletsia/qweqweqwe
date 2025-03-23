'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  stock: number;
  status: '판매중' | '판매중지' | '품절';
  title: string;
  price: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: '상태',
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          상품명
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="min-w-44 lowercase">{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'stock',
    header: '재고',
  },
  {
    accessorKey: 'price',
    header: '가격',
  },
  {
    id: 'actions',
    header: ' ',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-10">
            <DropdownMenuItem>수정</DropdownMenuItem>
            <DropdownMenuItem>삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
