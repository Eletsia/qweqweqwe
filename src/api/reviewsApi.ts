import supabase from '@/services/supabase';

//@param id 상품의 id 값
//@return 해당 상품에 대한 리뷰 정보 모두
export const getReviewsByItemId = async (id: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      review_id,
      uid,
      item_id,
      content,
      created_at
    `,
    )
    .eq('item_id', id);
  if (error) console.error('getReviewsByItemId', error);
  return data;
};

//@param id user의 uid 정보
//@return 해당 유저의 review 정보 모두
export const getReviewByUserId = async (id: string) => {
  const { data, error } = await supabase.from('reviews').select('*').eq('uid', id);
  if (error) console.error('getReviewByUserId', error);
  return data;
};
