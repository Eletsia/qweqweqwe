'use client';

import { useRouter } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const items = [
  {
    item_id: 1,
    title: '화이트 셔츠',
    content: '기본 화이트 셔츠입니다.',
    thumbnail: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSq-BDRcBOdlD02BwYzEWjn00M9JwV5oBmYJwCdw-JIlYj9Pe96H_NF-PjGyVamvp1DxldLGBe-uXIVBj9xhBybT0hhthcA_eVGk1MyEvketNWwXW8UjFCwMR2fg3lKhLB1Hg&usqp=CAc.jpg',
    price: 39900,
  },
  {
    item_id: 2,
    title: '블랙 팬츠',
    content: '세련된 블랙 팬츠입니다.',
    thumbnail: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTjIGsTwIfN6pPdm1kfoK0awT3Ci3XhWVEuY6OcE20CtE-j24mDWolvyUpU0Yy_rgVDPZUZN4QO5X9RO0ZvOL94fwMm6pn64xzGGLXAbHxms5gvm97mV6oDiFZEmCFHMMeb7g&usqp=CAc',
    price: 45900,
  },
  {
    item_id: 3,
    title: '청바지',
    content: '편안한 청바지입니다.',
    thumbnail: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSE7ctagxWYtju44NqVqxQLUc_892rUGuaFvIkBTqVqaQEoFoUuFIWdiPvey6SWoKhLT0nUQtKbAvS1L3hBhrbOV7eoqUJsEQeUpDcMbydq7Djm04sRrg&usqp=CAc',
    price: 42390,
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">전체 상품</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card
            key={item.item_id}
            className="border cursor-pointer"
            onClick={() => router.push(`/detail/${item.item_id}`)}
          >
            <CardHeader>
              <img src={item.thumbnail} alt={item.title} className="w-full h-auto max-h-40 object-cover" />
              <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-1">{item.content}</p>
              <p className="text-sm text-gray-500">{item.price.toLocaleString()}원</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}