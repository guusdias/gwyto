import ICourse from "../../types/ICourse";
import ModalEdit from "../ModalEdit";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

interface CourseCardProps {
  course: ICourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Center py={6}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx={[0, 5]}
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
      >
        <Box h={"200px"} borderBottom={"1px"} borderColor="black">
          <Img
            src={
              course.image_url ||
              "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
            }
            roundedTop={"sm"}
            objectFit="cover"
            h="full"
            w="full"
            alt={`${course.title}`}
          />
        </Box>
        <Box textAlign="left" p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              Curso
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
            {course.title}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {course.description}
          </Text>
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <ModalEdit
              id={course.id}
              title={course.title}
              description={course.description}
              storage={course.total_video_size}
              startDate={course?.start_date}
              endDate={course?.end_date}
            />{" "}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
