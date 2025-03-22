'use client';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CartItem } from '@/types/cartType';
import { cartStore } from '@/store/cartStore';

interface DataTableProps {
  columns: ColumnDef<CartItem>[];
  data: CartItem[];
}

/**
 * 데이터 테이블 컴포넌트
 * @param DataTableProps.columns - 장바구니 컬럼 데이터
 * @param DataTableProps.data - 아이템 리스트
 */
export function DataTable({ columns, data }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({});
  const removeItem = cartStore((state) => state.removeItem);

  /**
   * 테이블 인스턴스
   */
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    getRowId: (row) => row.item.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  /**
   * 삭제 버튼 이벤트 핸들러
   * - rowSelection이 비어있지 않을 경우에만 동작합니다.
   */
  const handleClickDelete = () => {
    const idList = Object.keys(rowSelection);
    if (idList.length === 0) return;
    const isConfirmed = confirm('선택한 상품을 삭제하시겠습니까?');
    if (isConfirmed) {
      removeItem(idList);
    }
  };

  return (
    <div>
      {table.getRowModel().rows?.length === 0 ? (
        <div className="p-5 text-gray-500">장바구니가 비어있습니다.</div>
      ) : (
        <>
          <Button onClick={handleClickDelete} className="m-2 p-3 text-xs font-semibold">
            선택 삭제
          </Button>
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="text-center"
                            key={header.id}
                            colSpan={header.colSpan}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
