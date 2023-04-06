import { useToast } from "@chakra-ui/react";

const useToastSuccess = () => {
  const toast = useToast();
  const useToastSuccess = () => {
    toast({
      title: "Create Data Successfully!",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return useToastSuccess;
};

export default useToastSuccess;
