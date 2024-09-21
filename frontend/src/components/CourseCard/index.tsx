import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import ICourse from "../../types/ICourse";
import ModalEdit from "../ModalEdit";

interface CourseCardProps {
  course: ICourse;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <>
      <Card>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          gap={4}
          p={4}
        >
          <Box boxSize={{ base: "xs", md: "sm" }} flexShrink={0}>
            <Image
              src={
                course.image_url ||
                "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
              }
              alt={`Image for course: ${course.title}`}
              objectFit="fill"
              borderRadius="md"
            />
          </Box>

          <Box flex="1">
            <CardHeader>
              <Heading size="lg">{course.title}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                <Box>
                  <Heading size="sm" textTransform="uppercase">
                    Description
                  </Heading>
                  <Text mt={2} fontSize="md">
                    {course.description}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Box>
          <ModalEdit
            id={course.id}
            title={course.title}
            description={course.description}
            storage={course.total_video_size}
            startDate={course.start_date}
            endDate={course.end_date}
          />
        </Flex>
      </Card>
    </>
  );
}
