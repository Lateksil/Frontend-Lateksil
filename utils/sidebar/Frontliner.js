import { IoDocumentText } from "react-icons/io5";
import { MdOutlinePeopleOutline, MdPostAdd } from "react-icons/md";

function generateSidebaritemFrontliner() {
  return [
    {
      name: "Proyek Pengujian",
      path: "/",
      icon: IoDocumentText,
      sub: [
        {
          name: "Pengajuan Pemesanan",
          path: "/frontliner",
        },
        {
          name: "Proses Pengujian",
          path: "/proses-pengujian",
        },
      ],
    },
    {
      name: "Input Pengujian",
      path: "/frontliner/input-pengujian",
      icon: MdPostAdd,
    },
    {
      name: "Data Costumer",
      path: "/frontliner/data-costumer",
      icon: MdOutlinePeopleOutline,
    },
  ];
}

export default generateSidebaritemFrontliner;
