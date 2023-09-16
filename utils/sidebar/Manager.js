import { FaUserEdit } from 'react-icons/fa';
import { IoDocumentText, IoPeopleSharp } from 'react-icons/io5';

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
          name: 'Tahap Pengerjaan',
          path: '/manager/tahap-pengerjaan',
        },
        {
          name: 'Selesai Pemesanan',
          path: '/manager/selesai-pemesanan',
        },
      ],
    },
    {
      name: 'Data Teknisi',
      path: '/manager/data-teknisi',
      icon: IoPeopleSharp,
    },
    {
      name: 'Role Permissions',
      path: '/manager/role-permissions',
      icon: FaUserEdit,
    },
  ];
}

export default generateSidebaritemManager;
