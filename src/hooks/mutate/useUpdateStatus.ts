import { OrderStatus } from '@/components/shop-manage/order/temp';
import supabase from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** 주문 상품 상태를 변경하는 쿼리 훅 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
      updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      alert(`상품의 상태가 변경되었습니다.`);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};

// 아이템의 상태 바꾸기
export const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
  const { error } = await supabase
    .from('ordered_items')
    .update({ order_status: status })
    .eq('order_id', orderId);
  if (error) throw new Error('상품 상태를 바꾸는 도중 오류가 발생했습니다.');
};
