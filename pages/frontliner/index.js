import React from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';

const HomeDashboardFrontliner = () => {
  return (
    <div>HomeDashboardFrontliner</div>
  )
}

export const getServerSideProps = getServerSidePropsFrontliner;

HomeDashboardFrontliner.getLayout = (page) => (
    <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
  );

export default HomeDashboardFrontliner