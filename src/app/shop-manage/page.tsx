'use client';

import { useEffect, useState } from 'react';

import { SiteHeader } from '@/components/shop-manage/SiteHeader';
import { SidebarInset } from '@/components/ui/sidebar';

import type { Payment } from './columns';

import { useUpdateItem } from '@/hooks/mutate/useUpdateItem';
import { useDeleteItem } from '@/hooks/mutate/useDeleteItem';
import { useItemsBySellerId } from '@/hooks/queries/useItemsBySellerId';

import useAuthStore from '@/store/authStore';
import { getSellerInfo } from '@/api/sellersApi';
import { DataTableWithSearch } from '@/components/shop-manage/DataTableWithSearch';

export default function ShopManagePage() {
  const user = useAuthStore((state) => state.user);
  const [sellerId, setSellerId] = useState<number | null>(null);
  const [isSellerLoading, setIsSellerLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user?.id) {
        setIsSellerLoading(false);
        return;
      }
      try {
        const { data, error } = await getSellerInfo(user.id);
        if (error || !data) {
          console.error('Seller 정보를 불러오는데 실패했습니다.', error);
        } else {
          setSellerId(data.seller_id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSellerLoading(false);
      }
    })();
  }, [user]);

  const {
    data: paymentList,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useItemsBySellerId(sellerId ?? 0, {
    enabled: sellerId !== null && !isSellerLoading,
  });

  const updateMutation = useUpdateItem();
  const deleteMutation = useDeleteItem();

  if (!user || isSellerLoading || isPaymentLoading) {
    return <p>로딩 중...</p>;
  }

  if (paymentError) {
    return <p>에러가 발생했습니다.</p>;
  }

  const handleUpdate = (updated: Payment) => {
    updateMutation.mutate(updated);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <SidebarInset>
      <SiteHeader headerTitle="내 상품 목록" />
      <DataTableWithSearch
        data={paymentList ?? []}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </SidebarInset>
  );
}
