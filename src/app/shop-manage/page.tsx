'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/shop-manage/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { DataTable } from '@/components/shop-manage/data-table';
import { createColumns } from './columns';
import type { Payment } from './columns';

const initialPayments: Payment[] = [
  {
    id: '728ed52f',
    stock: 100,
    status: '판매중',
    title: '자전거',
    price: 100000,
  },
  {
    id: '489e1d42',
    stock: 0,
    status: '품절',
    title: '오토바이',
    price: 15000000,
  },
  // 더 추가 가능
];

const ShopManagePage = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>(initialPayments);

  const handleUpdate = (updated: Payment) => {
    setPaymentList((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    console.log(paymentList);
  };

  const columns = createColumns(handleUpdate);

  return (
    <SidebarInset>
      <SiteHeader headerTitle="내 상품 목록" />
      <DataTable columns={columns} data={paymentList} />
    </SidebarInset>
  );
};

export default ShopManagePage;
