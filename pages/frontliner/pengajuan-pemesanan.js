import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getServerSidePropsFrontliner } from "../../utils/getServerSidePropsFrontliner";

const PengajuanPemesananFrontliner = () => {
  return <div>PengajuanPemesananFrontliner</div>;
};

export const getServerSideProps = getServerSidePropsFrontliner;

PengajuanPemesananFrontliner.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default PengajuanPemesananFrontliner;
