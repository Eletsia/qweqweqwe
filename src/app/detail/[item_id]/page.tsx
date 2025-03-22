'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import supabase from '@/services/supabase';
import { ImageSlider } from '@/components/detail/ImageSlider';

interface Item {
  title: string;
  content: string;
  price: number;
  thumbnail: string;
  img_list?: string; // JSON 문자열로 들어오는 img_list
}

export default function DetailPage() {
  const { item_id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
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
      try {
        const parsed = JSON.parse(data.img_list || '[]');
        setImages([data.thumbnail, ...parsed]); // 썸네일 + 추가 이미지
      } catch {
        setImages([data.thumbnail]); // JSON 파싱 실패시 썸네일만
      }
    };

    if (item_id) {
      fetchItem();
    }
  }, [item_id]);

  if (!item) return <p className="text-center mt-10">상품 정보를 불러오는 중...</p>;

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>

      <ImageSlider images={images} />

      <p className="text-gray-700 text-base mb-2">{item.content}</p>
      <p className="text-lg font-semibold">{item.price.toLocaleString()}원</p>
    </main>
  );
}