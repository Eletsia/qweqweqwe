import supabase from '@/services/supabase';
import { Item } from '@/types/cartType';

/**
 * DB로부터 아이템 디테일 리스트를 가져오는 함수
 * @param ids - 가져오고자 하는 아이템의 id 배열
 * @returns 아이템 정보 배열
 */
export const getItemDetails = async (ids: number[]): Promise<Item[]> => {
  if (ids.length === 0) return [];

  const { data, error } = await supabase.from('items').select('*').in('item_id', ids);

  if (error) throw error;

  const items: Item[] = data.map((item) => {
    return {
      id: item.item_id,
      sellerId: item.seller_id,
      title: item.title,
      content: item.content,
      thumbnail: '',
      stock: item.stock,
      price: item.price,
    };
  });

  return items;
};
