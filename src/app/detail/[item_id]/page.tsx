'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/services/supabase';
import { ImageSlider } from '@/components/detail/ImageSlider';
import { AddCartButton } from '@/components/cart/AddCartButton';
import {Item} from "@/types/type"

// 특정 상품을 Supabase에서 가져오는 함수
const fetchDetailItem = async (item_id: string | string[]): Promise<Item> => {
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('item_id', Number(item_id))
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export default function DetailPage() {
  const { item_id } = useParams();

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery<Item>({
    queryKey: ['item', item_id], // item_id 별로 캐싱하는 쿼리키
    queryFn: () => fetchDetailItem(item_id), 
    enabled: !!item_id, // 상품 id 없을땐 쿼리 실행 안함
  });

  // 이미지 리스트 파싱 로직 (썸네일 + JSON 이미지 배열)
  const images: string[] = (() => {
    // item이 없다면 빈 배열
    if (!item) return [];
    try {
      const parsed = JSON.parse(item.img_list || '[]'); //문자열을 이미지형태로 파싱
      return [item.thumbnail, ...parsed]; // 썸네일이 맨 앞으로 나오게 함
    } catch {
      return [item.thumbnail]; //파싱 실패 할 경우 썸네일만 표시
    }
  })();

  if (isLoading) return <p className="mt-10 text-center">상품 정보를 불러오는 중...</p>;
  if (isError)
    return <p className="mt-10 text-center text-red-500">에러: {(error as Error).message}</p>;

  return (
    <main className="mx-auto max-w-6xl p-4 pt-20">
       {/* 반응형 디자인: 모바일에서는 세로, 데스크탑에서는 가로 */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* 왼쪽: 이미지 섹션 */}
        <div className="md:w-1/2">
          <ImageSlider images={images} />
        </div>

        {/* 오른쪽: 상품 정보 섹션 */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{item!.title}</h1>
            <p className="text-base text-gray-700 mb-2">{item!.content}</p>
            <p className="text-lg font-semibold mb-6 mt-3">
              {item!.price.toLocaleString()}원
            </p>
          </div>

          {/* 장바구니 버튼 추가 */}
          <AddCartButton id={Number(item_id)} amount={1} />
        </div>
      </div>
    </main>
  );
}