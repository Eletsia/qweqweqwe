import { ItemCardList } from '@/components/cart/ItemCardList';

export default function CartPage() {
  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <h2 className="text-2xl font-bold">장바구니</h2>
      <ItemCardList />
    </div>
  );
}
