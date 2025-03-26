import supabase from '@/services/supabase';
import { OrderedItem, OrderStatus } from '@/types/orderType';

//@param id 판매자의 id 값 seller_id
//@return 판매자에게 들어온 모든 주문데이터터
export const getOrderedItemsBySellerId = async (id: number) => {
  const { data, error } = await supabase.rpc('get_ordered_items', {
    p_seller_id: id,
  });

  if (error) throw new Error('상품 목록을 가져오는 도중 오류가 발생했습니다.');

  return data as OrderedItem[];
};

//@param id order_id 주문번호
//@return 해당 주문번호에 대한 모든 연관데이터
export const getOrderedItemsById = async (id: number) => {
  const { data, error, status } = await supabase
    .from('ordered_items')
    .select('*')
    .eq('order_id', id);

  return data;
};

//@param item 배열
//@return 추가된 item 데이터 값
export const addOrderedItems = async (items: ItemArray) => {
  const { data, error, status } = await supabase.from('ordered_items').insert([items]).select();
  return data;
};

//@param 삭제할 주문문의 order_id 값
//@return 삭제 결과
export const deleteOrderItems = async (id: number) => {
  const { data, error, status } = await supabase.from('ordered_items').delete().eq('order_id', id);
  return data;
};

// 아이템의 상태 바꾸기
export const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
  const { error } = await supabase
    .from('ordered_items')
    .update({ order_status: status })
    .eq('order_id', orderId);
  if (error) throw new Error('상품 상태를 바꾸는 도중 오류가 발생했습니다.');
};
