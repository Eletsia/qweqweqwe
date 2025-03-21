'use client';

import { useParams } from 'next/navigation';

export default function DetailPage() {
  const { item_id } = useParams();

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">상품 상세 정보</h1>
      <p>상품 ID: {item_id}</p>
    </main>
  );
}