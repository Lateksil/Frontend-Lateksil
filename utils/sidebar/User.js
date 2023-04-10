import { FaRegCheckSquare } from "react-icons/fa";
import {
  HiCreditCard,
  HiDocumentText,
  HiHomeModern,
  HiShoppingCart,
} from "react-icons/hi2";

function generateSidebaritemUser() {
  return [
    {
      name: "Halaman Utama",
      path: "/",
      icon: HiHomeModern,
    },
    {
      name: "Keranjang",
      path: "/cart",
      icon: HiShoppingCart,
    },
    // {
    //   name: "Testing",
    //   path: "/testing",
    //   icon: HiCreditCard,
    // },
    {
      name: "Riwayat Transaksi",
      path: "/history-transactions",
      icon: HiDocumentText,
    },
  ];
}

export default generateSidebaritemUser;
