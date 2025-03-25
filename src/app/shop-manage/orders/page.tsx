'use client';

import { DataTable } from '@/components/shop-manage/order/OrderDataTable';
import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';
import { UseGetOrders } from '@/hooks/queries/useGetOrders';
import useAuthStore from '@/store/authStore';
import React from 'react';

const OrderPage = () => {
  const user = useAuthStore((state) => state.user);
  const { data: orderedItems, isLoading, isError } = UseGetOrders(user?.id as string);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (orderedItems && orderedItems.length === 0)
    return <div className="p-5 text-gray-500">주문 목록이 비어있습니다.</div>;

  return (
    <SidebarInset>
      <SiteHeader headerTitle="주문 목록" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <DataTable data={orderedItems ?? []} />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default OrderPage;
