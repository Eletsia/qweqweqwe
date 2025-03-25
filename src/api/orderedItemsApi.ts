import { Items } from '@/app/mypage/_types/type';
import supabase from '@/services/supabase';

//@param id 판매자의 id 값 seller_id
//@return 판매자에게 들어온 모든 주문데이터터
export const getOrderedItemsBySellerId = async (id: number) => {
  const { data, error } = await supabase
    .from('ordered_items')
    .select(
      `
      order_id,
      item_id,
      stock,
      buyer_id,
      order_status,
      created_at,
      sellers!inner(seller_id, user_id),   
    `,
    )
    .eq('seller_id', id);
  if (error) console.error('getOrderedItemsBySellerId', error);
  return data;
};

export const getOrderedItemsByBuyerId = async (id: string) => {
  const { data, error } = await supabase
    .from('ordered_items')
    .select(
      `order_id,amount,item_id,order_status,created_at,
      items(title, thumbnail)
      `,
    )
    .eq('buyer_id', id);

  if (error) console.error('getOrderedItemsByBuyerId', error);
  return data;
};

//@param id order_id 주문번호
//@return 해당 주문번호에 대한 모든 연관데이터
export const getOrderedItemsById = async (id: number) => {
  const { data, error } = await supabase.from('ordered_items').select('*').eq('order_id', id);
  if (error) console.error('getOrderedItemsById', error);
  return data;
};

//@param item 배열
//@return 추가된 item 데이터 값
export const addOrderedItems = async (items: Items[]) => {
  const { data, error } = await supabase.from('ordered_items').insert([items]).select();
  if (error) {
    console.error('addOrderedItems', error);
    return;
  }
  return data;
};

//@param 배송상태 string enum 값
//enum list : pending paid shipped delivered cancelled
//@return 업데이트된 status 데이터 값
export const updateOrderStatus = async (status: string) => {
  const { data, error } = await supabase
    .from('items')
    .update({
      status: status,
    })
    .select();
  if (error) {
    console.error('updateOrderStatus', error);
    return;
  }
  return data;
};

//@param 삭제할 주문의 order_id 값
//@return 삭제 결과
export const deleteOrderItems = async (id: number) => {
  const { data, error } = await supabase.from('ordered_items').delete().eq('order_id', id);
  if (error) {
    console.error('deleteOrderItems', error);
    return;
  }
  return data;
};
