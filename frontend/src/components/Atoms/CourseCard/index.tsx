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
import ICourse from "../../../types/ICourse";

interface CourseCardProps {
  course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={4}
        p={4}
      >
        <Box boxSize={{ base: "xs", md: "sm" }} flexShrink={0}>
          <Image
            src={course.imageUrl}
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
      </Flex>
    </Card>
  );
}
