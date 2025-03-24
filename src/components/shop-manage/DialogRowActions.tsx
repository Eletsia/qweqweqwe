'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MoreHorizontal } from 'lucide-react';
import type { Payment } from '@/app/shop-manage/columns'; // 경로 맞게 수정

type Props = {
  payment: Payment;
  onUpdate: (updated: Payment) => void;
};

export function DialogRowActions({ payment, onUpdate }: Props) {
  const [status, setStatus] = useState<'판매중' | '판매중지' | '품절'>(payment.status);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          <DropdownMenuItem asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2 py-1 text-sm">
                수정
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 수정</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const updated: Payment = {
              id: payment.id,
              title: formData.get('title') as string,
              price: Number(formData.get('price')),
              stock: Number(formData.get('stock')),
              status,
            };
            onUpdate(updated);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium">상품명</label>
            <Input name="title" defaultValue={payment.title} />
          </div>

          <div>
            <label className="text-sm font-medium">가격</label>
            <Input name="price" type="number" defaultValue={payment.price} />
          </div>

          <div>
            <label className="text-sm font-medium">재고</label>
            <Input name="stock" type="number" defaultValue={payment.stock} />
          </div>

          <div>
            <label className="text-sm font-medium">상태</label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as '판매중' | '판매중지' | '품절')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="판매중">판매중</SelectItem>
                <SelectItem value="판매중지">판매중지</SelectItem>
                <SelectItem value="품절">품절</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">저장</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
