import { ListingCourses } from "../../components/ListingCourses";
import ModalCreateCourse from "../../components/ModalCreate";
import { useDisclosure } from "@chakra-ui/react";
import Header from "../../components/Atoms/Header";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Header />
      <ListingCourses onCreate={onOpen} />
      <ModalCreateCourse isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
