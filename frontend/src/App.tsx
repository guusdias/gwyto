import { ListingCourses } from "./components/ListingCourses";
import ModalCreateCourse from "./components/ModalCreate";
import { useDisclosure } from "@chakra-ui/react";
import "./App.css";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div>
        <ListingCourses onCreate={onOpen} />
        <ModalCreateCourse isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
}

export default App;
