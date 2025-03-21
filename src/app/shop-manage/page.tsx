import { SiteHeader } from '@/components/shop-manage/site-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { DataTable } from '@/components/shop-manage/data-table';
import { columns } from './columns';
import { Payment } from './columns';

export const payments: Payment[] = [
  {
    id: '728ed52f',
    stock: 100,
    status: '판매중',
    title: '자전거',
    price: 100000,
  },
  {
    id: '489e1d42',
    stock: 0,
    status: '품절',
    title: '오토바이',
    price: 15000000,
  },
  // ...
];

const ShopManagePage = () => {
  return (
    <SidebarInset>
      <SiteHeader headerTitle="내 상품 목록" />
      <DataTable columns={columns} data={payments} />
    </SidebarInset>
  );
};

export default ShopManagePage;
