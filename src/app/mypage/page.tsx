'use client';
import { getUserInfo } from '@/api/usersApi';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
export default function MyPage() {
  const [user, setUser] = useState<{ nickname: string; email: string; introduction: string }>();
  const [selectedTab, setSelectedTab] = useState('orders');
  useEffect(() => {
    async function fetchUsers() {
      const data = await getUserInfo('5360358d-5de7-43f7-8998-58f02b79a46c');
      setUser(data);
    }
    fetchUsers();
  }, []);
  const tabContents = {
    orders: [
      { id: 1, src: '/order1.jpg' },
      { id: 2, src: '/order2.jpg' },
      { id: 3, src: '/order3.jpg' },
    ],
    reviews_written: [
      { id: 1, src: '/review1.jpg' },
      { id: 2, src: '/review2.jpg' },
      { id: 3, src: '/review3.jpg' },
      { id: 3, src: '/review3.jpg' },
      { id: 3, src: '/review3.jpg' },
      { id: 3, src: '/review3.jpg' },
    ],
    reviews_unwritten: [
      { id: 1, src: '/review1.jpg' },
      { id: 2, src: '/review2.jpg' },
      { id: 3, src: '/review3.jpg' },
    ],
  };

  return (
    <div className="relative mx-auto mt-4 flex w-full max-w-4xl flex-col items-center p-6">
      <Button className="absolute right-0 top-0">주문관리</Button>
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 mt-12 text-center">
          <h2 className="text-3xl font-bold">{user?.nickname}</h2>
          <p className="text-lg text-muted-foreground">{user?.email}</p>
          <p className="text-muted-foreground">{user?.introduction}</p>
        </div>

        <div className="mt-6 flex w-full max-w-3xl justify-around border-b pb-3">
          {[
            { key: 'orders', label: '주문 배송' },
            { key: 'reviews_written', label: '작성한 후기' },
            { key: 'reviews_unwritten', label: '작성 가능한 후기' },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-lg font-bold ${
                selectedTab === tab.key
                  ? 'border-b-4 border-blue-500 text-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid w-full max-w-4xl grid-cols-3 gap-6">
        {tabContents[selectedTab].map((item) => (
          <div key={item.id} className="relative h-40 w-full bg-gray-200">
            <img src={item.src} className="h-full w-full rounded-lg object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
