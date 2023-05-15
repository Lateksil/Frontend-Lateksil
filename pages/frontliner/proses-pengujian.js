import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const ProsesPengujian = () => {
  return <div>ProsesPengujian</div>;
};

ProsesPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default ProsesPengujian;
