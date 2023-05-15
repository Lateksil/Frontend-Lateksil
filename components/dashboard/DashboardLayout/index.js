import { Flex } from '@chakra-ui/react';
import DashboardProvider from '../../../context/dashboard/DashboardProvider';
import generateSidebaritemFrontliner from '../../../utils/sidebar/Frontliner';
import generateSidebaritemUser from '../../../utils/sidebar/User';
import DashboardMain from '../DashboardMain';
import DashboardSidebar from '../DashboardSidebar';

const DashboardLayout = ({ sidebarFor, children }) => {
  let sidebarItems = [];

  switch (sidebarFor) {
    case 'frontliner':
      sidebarItems = generateSidebaritemFrontliner();
      break;
    case 'users':
      sidebarItems = generateSidebaritemUser();
      break;
    default:
      sidebarItems = generateSidebaritemUser();
      break;
  }

  return (
    <Flex overflow="hidden">
      <DashboardProvider>
        <DashboardSidebar items={sidebarItems} />
        <DashboardMain>{children}</DashboardMain>
      </DashboardProvider>
    </Flex>
  );
};

export default DashboardLayout;
