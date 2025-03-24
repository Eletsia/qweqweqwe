import supabase from '@/services/supabase';

//@param id 판매자의 id 값 seller_id
//@return 판매자가 보유한 items의 모든 column
export const getItemsBySellerId = async (id: number) => {
  const { data, error, status } = await supabase
    .from('items')
    .select(
      `
      title,
      content,
      thumbnail,
      img_list,
      stock,
      price,
      created_at,
      sellers!inner(seller_id, user_id),   
    `,
    )
    .eq('seller_id', id);
  if (error) {
    console.error('getItemBySellerId', error);
    return;
  }
  return data;
};

//@param id 상품의 id 값
//@return 해당 상품에 대한 정보만 가져옴
export const getItemById = async (id: number) => {
  const { data, error, status } = await supabase.from('items').select('*').eq('item_id', id);
  if (error) console.error('getItemById', error);
  return data;
};

//@param id[] 가져올 상품의 id 배열 값
//@return 일치하는 상품들의 정보 배열
export const getItemsByIdArray = async (ids: number[]) => {
  const { data, error, status } = await supabase.from('items').select('*').in('id', ids);
  if (error) console.error('getItemByIdArray', error);
  return data;
};

//@param item 배열
//@return 추가된 item 데이터 값
export const addItem = async (item: Item) => {
  const { data, error, status } = await supabase.from('items').insert([item]).select();
  if (error) {
    console.error('addItem', error);
    return;
  }
  return data;
};

//@param item 배열
//@return 업데이트된 item 데이터 값
export const updateItem = async (item: Item) => {
  const { data, error, status } = await supabase.from('items').upsert([item]).select();
  if (error) {
    console.error('updateItem', error);
    return;
  }
  return data;
};

//@param 삭제할 아이템의 id 값
//@return 삭제 결과
export const deleteItem = async (id: number) => {
  const { data, error, status } = await supabase.from('items').delete().eq('item_id', id);
  if (error) {
    console.error('deleteItem', error);
    return;
  }
  return data;
};
