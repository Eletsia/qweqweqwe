'use client';
import { getUserInfo } from '@/api/usersApi';
import { useEffect, useState } from 'react';
import { Cards } from './_components/Card';
import { getOrderedItemsByBuyerId } from '@/api/orderedItemsApi';
import { getUnWrittenReviewByUserId, getWrittenReviewByUserId } from '@/api/reviewsApi';
import { Profile } from './_components/Profile';
import { StoreButton } from './_components/StoreButton';
import { Orders, Orders2, Reviews, TabContents, User } from './_types/type';
import useAuthStore from '@/store/authStore';

export default function MyPage() {
  const [user, setUser] = useState<User>({
    nickname: '',
    email: '',
    introduction: '',
  });
  const [selectedTab, setSelectedTab] = useState<
    'orders' | 'reviews_written' | 'reviews_unwritten'
  >('orders');
  const userInfo = useAuthStore((state) => state.user);
  const userId = userInfo?.id || '';

  const [tabContents, setTabContents] = useState<TabContents>({
    orders: [],
    reviews_written: [],
    reviews_unwritten: [],
  });
  const convertOrders2ToOrders = (orders2: Orders2[]): Orders[] => {
    return orders2.map((order) => ({
      ...order,
      items: order.items && order.items.length > 0 ? order.items[0] : { title: '', thumbnail: '' },
    }));
  };

  useEffect(() => {
    async function fetchUsers() {
      const data: User = (await getUserInfo(userId)) || {
        nickname: '',
        email: '',
        introduction: '',
      };
      setUser(data);
    }
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders2: Orders2[] = (await getOrderedItemsByBuyerId(userId)) || [];
        console.log('qqqqqq', orders2);
        const orders: Orders[] = convertOrders2ToOrders(orders2);
        const reviewsWritten: Reviews[] = (await getWrittenReviewByUserId(userId)) || [];
        const reviewsUnwritten: Reviews[] = (await getUnWrittenReviewByUserId(userId)) || [];

        setTabContents({
          orders: orders,
          reviews_written: reviewsWritten,
          reviews_unwritten: reviewsUnwritten,
        });
      } catch (error) {
        console.error('Unexpected error', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-4xl flex-col items-center p-6">
      <StoreButton id={userId} />
      <Profile user={user} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Cards tabContents={tabContents} selectedTab={selectedTab}></Cards>
    </div>
  );
}
