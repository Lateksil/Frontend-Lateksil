import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash } from "react-icons/fi";
import useRemotePengujian from "../../../hooks/remote/useRemotePengujian";
import DetailPengujianModal from "../../../modals/frontlinerModal/detailPengujianModal";

const PengujianTableFrontliner = () => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const { data: dataPengujian } = useRemotePengujian();
  return (
    <React.Fragment>
      {dataPengujian?.data?.map((pengujian, i) => (
        <React.Fragment key={i}>
          <Tooltip label="cek detail" hasArrow>
            <Tr>
              <Td onClick={onOpen}>{pengujian.jenis_pengujian}</Td>
              <Td onClick={onOpen}>{pengujian.category}</Td>
              <Td onClick={onOpen}>{pengujian.description}</Td>
              <Td onClick={onOpen}>7</Td>
              <Td onClick={onOpen}>Per {pengujian.sampler}</Td>
              <Td onClick={onOpen}>{pengujian.catatan_khusus}</Td>
              <Td onClick={onOpen} isNumeric>
                Rp{pengujian.price}
              </Td>

              <Td>
                <Menu placement="left">
                  <MenuButton
                    as={IconButton}
                    icon={<BsThreeDotsVertical color="blue" />}
                    variant="outline"
                    borderColor="blue"
                    width={5}
                    rounded="xl"
                    aria-label="Affiliate Materi"
                  />
                  <MenuList>
                    <MenuItem icon={<FiEdit />} color="blue.700">
                      Ubah
                    </MenuItem>
                    <MenuItem icon={<FiTrash />} color="red.600">
                      Hapus
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tooltip>
        </React.Fragment>
      ))}
      <DetailPengujianModal
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </React.Fragment>
  );
};

export default PengujianTableFrontliner;
