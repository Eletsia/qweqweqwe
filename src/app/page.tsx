'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import supabase from '@/services/supabase';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

interface Item {
  item_id: number;
  title: string;
  content: string;
  thumbnail: string;
  price: number;
}

async function fetchItems(): Promise<Item[]> {
  const { data, error } = await supabase.from('items').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data || [];
}

export default function HomePage() {
  const router = useRouter();

  const { data: items = [], isLoading, isError, error } = useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: fetchItems,
  });

  if (isLoading) {
    return <p className="text-center mt-10">상품 불러오는 중...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        에러 발생: {(error as Error).message}
      </p>
    );
  }

  return (
    <main className="p-4 max-w-4xl mx-auto pt-20">
      <h1 className="text-lg font-bold mb-4">전체 상품</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.item_id}
            className="cursor-pointer"
            onClick={() => router.push(`/detail/${item.item_id}`)}
          >
            <CardHeader>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <CardTitle className="text-base mt-2">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{item.content}</p>
              <p className="text-sm text-gray-500">
                {item.price.toLocaleString()}원
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}