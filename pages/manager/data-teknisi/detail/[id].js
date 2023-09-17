import React from 'react';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';

const DetailPemesanan = () => {
  return <div>DetailPemesanan</div>;
};

DetailPemesanan.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default DetailPemesanan;
