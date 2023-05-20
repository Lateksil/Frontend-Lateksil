import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';

const ProfileUser = () => {
  return <div>ProfileUser</div>;
};

export const getServerSideProps = getServerSidePropsCostumer;

ProfileUser.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default ProfileUser;
