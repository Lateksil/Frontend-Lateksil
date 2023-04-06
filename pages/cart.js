import React from 'react'
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';

const CartPage = () => {
  return (
    <div>Cart</div>
  )
}


export const getServerSideProps = getServerSidePropsCostumer;

CartPage.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);


export default CartPage