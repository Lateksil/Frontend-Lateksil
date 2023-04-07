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
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash } from "react-icons/fi";
import useMutationDeletePengujian from "../../../hooks/mutation/delete/useMutationDeletePengujian";
import useRemotePengujian from "../../../hooks/remote/useRemotePengujian";
import DetailPengujianModal from "../../../modals/frontlinerModal/detailPengujianModal";
import ModalWarning from "../../../modals/ModalWarning";

const PengujianTableFrontliner = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [getIdPengujian, setGetIdPengujian] = useState(null);

  const { mutate: mutateDeletePengujian } = useMutationDeletePengujian();

  const onOpenDeleteModal = (id) => {
    onOpenDelete();
    setGetIdPengujian(id);
  };

  const handleDeletePengujian = () => {
    mutateDeletePengujian(getIdPengujian);
    onCloseDelete();
  };

  return (
    <React.Fragment key={pengujian.id}>
      <Tooltip label="cek detail pengujian" hasArrow>
        <Tr cursor="pointer">
          <Td onClick={onOpen}>{pengujian.jenis_pengujian}</Td>
          <Td onClick={onOpen}>{pengujian.category}</Td>
          <Td onClick={onOpen}>{pengujian.description}</Td>
          <Td onClick={onOpen}>1</Td>
          <Td onClick={onOpen}>Per {pengujian.sampler}</Td>
          <Td onClick={onOpen}>{pengujian.catatan_khusus}</Td>
          <Td onClick={onOpen} isNumeric color="blue.700" fontWeight="semibold">
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
                <MenuItem
                  onClick={() => onOpenDeleteModal(pengujian.id)}
                  icon={<FiTrash />}
                  color="red.600"
                >
                  Hapus
                </MenuItem>
              </MenuList>
            </Menu>
          </Td>
        </Tr>
      </Tooltip>
      <DetailPengujianModal
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
      <ModalWarning
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        buttonText="Hapus Pengujian"
        buttonOnClick={handleDeletePengujian}
      >
        Kamu yakin ingin menghapus Pengujian?
      </ModalWarning>
    </React.Fragment>
  );
};

export default PengujianTableFrontliner;
