import supabase from '@/services/supabase';
import { Review } from '@/types/reviewType';

//@param id 상품의 id 값
//@return 해당 상품에 대한 리뷰 정보 모두
export const getReviewsByItemId = async (id: number): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('item_id', id)
    .eq('written', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? []; // null 대신 빈 배열 반환!

};

//@param id user의 uid 정보
//@return 해당 유저의 review 정보 모두
export const getReviewByUserId = async (id: string) => {
  const { data, error } = await supabase.from('reviews').select('*').eq('uid', id);
  if (error) console.error('getReviewByUserId', error);
  return data;
};
