import { useMutation } from "@tanstack/react-query";
import { postFetcher } from "../../../libs/axios";

const useMutationCreatePengujian = ({
  image,
  jenis_pengujian,
  code,
  category,
  description,
  sampler,
  catatan_khusus,
  price,
}) => {
  const uri = "/pengujian/create";

  const createPengujian = postFetcher(uri, {
    image,
    jenis_pengujian,
    code,
    category,
    description,
    sampler,
    catatan_khusus,
    price,
  });

  const createData = useMutation(createPengujian, {
    onSuccess: () => {
      console.log("Create successfully!");
    },
    onError: () => {
      console.log("Error....");
    },
  });

  return createData;
};

export default useMutationCreatePengujian;
