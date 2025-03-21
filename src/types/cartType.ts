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
};

/**
 * 로컬 스토리지에 저장하기 위한 타입
 */
export type CartStorageItem = {
  id: Item['id'];
  amount: number;
};

/**
 * 장바구니에서 보여주기 위한 타입
 */
export type CartItem = {
  item: Item;
  amount: number;
};
