import { IoDocumentText } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemManager() {
  return [
    {
      name: 'Proyek Pengujian',
      path: '/',
      icon: IoDocumentText,
      sub: [
        {
          name: 'Persetujuan Pesanan',
          path: '/manager',
        },
        {
          name: 'Proses Pengujian',
          path: '/manager/proses-pengujian',
        },
        {
          name: 'Tahap Pengujian',
          path: '/manager/proses-pengujian',
        },
      ],
    },
    {
      name: 'Data Teknisi',
      path: '/manager/data-teknisi',
      icon: MdPostAdd,
    },
  ];
}

export default generateSidebaritemManager;
