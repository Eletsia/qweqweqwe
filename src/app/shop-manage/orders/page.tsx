import { DataTable } from '@/components/shop-manage/order/OrderDataTable';
import { OrderItem } from '@/components/shop-manage/order/temp';
import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';
import React from 'react';

const OrderPage = () => {
  const data: OrderItem[] = [
    {
      amount: 1,
      created_at: new Date().toString(),
      item_id: 87,
      item: {
        item_id: 87,
        seller_id: 2,
        title: '상품 이름1',
        content: '상품 내용 상품 내용 상품 내용 상품 내용',
        price: 100000,
        stock: 4,
        thumbnail: '',
      },
      order_id: 3,
      order_status: 'pending',
    },
    {
      amount: 2,
      created_at: new Date().toString(),
      item_id: 88,
      item: {
        item_id: 87,
        seller_id: 2,
        title: '상품 이름2',
        content: '상품 내용 상품 내용 상품 내용 상품 내용',
        price: 5000,
        stock: 4,
        thumbnail: '',
      },
      order_id: 4,
      order_status: 'paid',
    },
  ];

  return (
    <SidebarInset>
      <SiteHeader headerTitle="주문 목록" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default OrderPage;
