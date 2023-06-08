import { IoDocumentText } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemTeknisi() {
  return [
    {
      name: 'Task Pengujian',
      path: '/teknisi',
      icon: IoDocumentText,
    },
    {
      name: 'Report Pengujian',
      path: '/teknisi/report',
      icon: MdPostAdd,
    },
    {
      name: 'Pengerjaan',
      path: '/teknisi/pengerjaan',
      icon: MdPostAdd,
    },
  ];
}

export default generateSidebaritemTeknisi;
