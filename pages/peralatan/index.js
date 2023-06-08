import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsPeralatan } from '../../utils/getServerSidePropsPeralatan';

const PengajuanPeralatan = () => {
  return <div>PengajuanPeralatan</div>;
};

export const getServerSideProps = getServerSidePropsPeralatan;

PengajuanPeralatan.getLayout = (page) => (
  <DashboardLayout sidebarFor="peralatan">{page}</DashboardLayout>
);

export default PengajuanPeralatan;
