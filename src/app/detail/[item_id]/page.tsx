'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/services/supabase';

interface Item {
  title: string;
  content: string;
  price: number;
  thumbnail: string;
}

export default function DetailPage() {
  const { item_id } = useParams();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    // Supabase에서 해당 상품 데이터 불러오기
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('item_id', Number(item_id))
        .single();

      if (error) {
        console.error('상품 가져오기 실패:', error.message);
        return;
      }

      setItem(data);
    };

    if (item_id) {
      fetchItem();
    }
  }, [item_id]);

  if (!item) return <p className="text-center mt-10">상품 정보를 불러오는 중...</p>;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>

      {/* 상품 썸네일 이미지 */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full max-h-[24rem] object-cover rounded mb-4"
      />

      <p className="text-gray-700 text-base mb-2">{item.content}</p>
      <p className="text-lg font-semibold">{item.price.toLocaleString()}원</p>
    </main>
  );
}