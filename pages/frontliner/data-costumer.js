import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';

const DataCostumer = () => {
  return <div>DataCostumer</div>;
};

export const getServerSideProps = getServerSidePropsFrontliner;

DataCostumer.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default DataCostumer;
