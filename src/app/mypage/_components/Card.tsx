import ReviewModal from '@/components/mypage/ReviewModal';
import { TabContents } from '../_types/type';

type CardProps = {
  tabContents: TabContents;
  selectedTab: 'orders' | 'reviews_written' | 'reviews_unwritten';
};
export const Cards = ({ tabContents, selectedTab }: CardProps) => {
  if (selectedTab === 'orders') {
    return (
      <>
        <div className="mt-8 grid w-full max-w-4xl grid-rows-3 gap-6">
          {tabContents[selectedTab].map((item, index) => (
            <div key={item.item_id || index} className="flex items-center gap-6">
              <div className="relative h-40 w-40 bg-gray-200">
                <img src={item.items.thumbnail} className="h-full w-full rounded-lg object-cover" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold">상품명 : {item.items.title}</h3>
                <p>배송 상태 : {item.order_status}</p>
                <p>수량 : {item.amount}</p>
                <p>주문 일자 : {item.created_at}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="mt-8 grid w-full max-w-4xl grid-rows-3 gap-6">
          {tabContents[selectedTab].map((item, index) => (
            <div key={item.item_id || index} className="flex items-center gap-6">
              <div className="relative h-40 w-40 bg-gray-200">
                <img src={item.items.thumbnail} className="h-full w-full rounded-lg object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">상품명 : {item.items.title}</h3>
                <p>{item.content || '리뷰를 작성해 주세요!'}</p>
                <p>작성 가능 날짜 : {item.created_at} 로 부터 7일</p>
              </div>
              <ReviewModal reviewId={item.review_id} written={item.written} />
            </div>
          ))}
        </div>
      </>
    );
};
