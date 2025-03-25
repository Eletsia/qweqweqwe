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
export const getWrittenReviewByUserId = async (id: string) => {
  const { data, error, status } = await supabase
    .from('reviews')
    .select('*,items(thumbnail,title)')
    .eq('uid', id)
    .eq('written', true);
  if (error) console.error('getWrittenReviewByUserId', error, status);
  return data;
};

//@param id user의 uid 정보
//@return 해당 유저의 review 정보 모두
export const getUnWrittenReviewByUserId = async (id: string) => {
  const { data, error, status } = await supabase
    .from('reviews')
    .select('*,items(thumbnail,title)')
    .eq('uid', id)
    .eq('written', false);
  if (error) console.error('getUnwrittenReviewByUserId', error, status);
  return data;
};

//@param id user의 uid 정보가 포함된 review 데이터
//@return 추가된 review 데이터 값
export const addReview = async ({ id, content }: { id: number; content: string }) => {
  const { data, error, status } = await supabase
    .from('reviews')
    .update({ content: content, written: true })
    .eq('review_id', id)
    .select();
  if (error) console.error('addreview', error, status);
  return data;
};
