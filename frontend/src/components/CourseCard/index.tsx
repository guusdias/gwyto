import { Card, Flex, Heading, Text, Image } from "@chakra-ui/react";
import ICourse from "../../types/ICourse";
import ModalEdit from "../ModalEdit";

interface CourseCardProps {
  course: ICourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <>
      <Card boxShadow="md" borderRadius="md" overflow="hidden">
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          gap={4}
          p={4}
        >
          <Image
            src={
              course.image_url ||
              "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
            }
            objectFit="cover"
            height="200px"
            alt={`${course.title}`}
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.02)" }}
          />
          <Flex textAlign="left" mt="4" direction="column">
            <Heading as="h3" fontSize="xl" fontWeight="bold" color={"gray.800"}>
              {course.title}
            </Heading>

            <Text mt={2} fontSize="md">
              {course.description}
            </Text>
          </Flex>
          <ModalEdit
            id={course.id}
            title={course.title}
            description={course.description}
            storage={course.total_video_size}
            startDate={course?.start_date}
            endDate={course?.end_date}
          />
        </Flex>
      </Card>
    </>
  );
}
