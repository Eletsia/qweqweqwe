import { Item } from '@/types/cartType';

// 주문 아이템 페이지에서 사용할 아이템 타입
export type OrderedItem = {
  amount: number;
  created_at: string;
  item_id: number;
  item: Item;
  order_id: number;
  order_status: OrderStatus;
};

// 주문 상태를 한국어로 변환
export const ORDER_STATUS = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return '주문 대기';
    case 'paid':
      return '결제 완료';
    case 'shipped':
      return '발송 완료';
    case 'delivered':
      return '배송 완료';
    case 'cancelled':
      return '취소';
  }
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
