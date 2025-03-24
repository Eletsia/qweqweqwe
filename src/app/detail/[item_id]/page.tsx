'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/services/supabase';
import { ImageSlider } from '@/components/detail/ImageSlider';

interface Item {
  title: string;
  content: string;
  price: number;
  thumbnail: string;
  img_list?: string; // JSON 문자열
}

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
    queryKey: ['item', item_id],
    queryFn: () => fetchDetailItem(item_id),
    enabled: !!item_id, // item_id가 있을 때만 실행
  });

  // 이미지 처리
  const images: string[] = (() => {
    if (!item) return [];
    try {
      const parsed = JSON.parse(item.img_list || '[]');
      return [item.thumbnail, ...parsed];
    } catch {
      return [item.thumbnail];
    }
  })();

  if (isLoading) return <p className="text-center mt-10">상품 정보를 불러오는 중...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">에러: {(error as Error).message}</p>;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item!.title}</h1>

      <ImageSlider images={images} />

      <p className="text-gray-700 text-base mb-2">{item!.content}</p>
      <p className="text-lg font-semibold">{item!.price.toLocaleString()}원</p>
    </main>
  );
}