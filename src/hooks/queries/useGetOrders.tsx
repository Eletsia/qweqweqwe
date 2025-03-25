import { OrderedItem } from '@/components/shop-manage/order/temp';
import supabase from '@/services/supabase';
import { useQuery } from '@tanstack/react-query';

/**
 * 판매자의 주문 아이템 정보를 가져오는 쿼리 훅
 * @param id 판매자의 uuid
 */
export const UseGetOrders = (id: string) => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const sellerInfo = await getSellerInfo(id);
      const data = await getOrderedItemsBySellerId(sellerInfo?.seller_id);
      return data;
    },
  });
};

// 유저의 uid로 seller id를 찾기
const getSellerInfo = async (uid: string) => {
  const { data, error } = await supabase
    .from('sellers')
    .select('seller_id')
    .eq('uid', uid)
    .maybeSingle();

  if (error) throw new Error('유저의 스토어 정보를 가져오는데 실패했습니다.');
  return data;
};

// 아이템 목록 가져오기
export const getOrderedItemsBySellerId = async (id: number) => {
  const { data, error } = await supabase.rpc('get_seller_ordered_items_nested', {
    p_seller_id: id,
  });

  if (error) throw new Error('상품 목록을 가져오는데 실패했습니다.');

  return data as OrderedItem[];
};
