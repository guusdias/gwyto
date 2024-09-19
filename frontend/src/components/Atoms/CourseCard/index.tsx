import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import ICourse from "../../../types/ICourse";

interface CourseCardProps {
  course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{course.title}</Heading> {/* Exibe o título */}
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {course.description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Start Date
            </Heading>
            <Text pt="2" fontSize="sm">
              {new Date(course.startDate).toLocaleDateString()}{" "}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              End Date
            </Heading>
            <Text pt="2" fontSize="sm">
              {new Date(course.endDate).toLocaleDateString()}{" "}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Total Video Size
            </Heading>
            <Text pt="2" fontSize="sm">
              {course.totalVideoSize} MB{" "}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
