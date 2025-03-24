import { getItemsByIdArray } from '@/api/itemsApi';
import { Item } from '@/types/cartType';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const UseGetCart = (itemIds: number[] | null): UseQueryResult<Item[], Error> => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      if (itemIds === null) throw new Error('장바구니 목록을 가져오는 도중 오류가 발생했습니다.');
      return getItemsByIdArray(itemIds);
    },
    enabled: itemIds !== null,
  });
};
