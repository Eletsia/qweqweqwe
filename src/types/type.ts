/**
 * 개별 아이템의 타입
 */
export type Item = {
  id: number;
  sellerId: number;
  title: string;
  content: string;
  thumbnail: string;
  stock: number;
  price: number;
  img_list?: string; // JSON 문자열
};

/**
 * 장바구니 화면에서 필요한 정보만 담고 있는 아이템 타입
 */
export type CartItem = {
  id: Item['id'];
  amount: number;
};
