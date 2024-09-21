import { ListingCourses } from "./components/ListingCourses";
import ModalCreateCourse from "./components/ModalCreate";
import { useDisclosure } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/Atoms/Header";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div>
        <Header />
        <ListingCourses onCreate={onOpen} />
        <ModalCreateCourse isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  );
}

export default App;
