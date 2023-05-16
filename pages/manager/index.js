import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';

const PengajuanPesanan = () => {
  return <div>PengajuanPesanan</div>;
};

export const getServerSideProps = getServerSidePropsManager;

PengajuanPesanan.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default PengajuanPesanan;
