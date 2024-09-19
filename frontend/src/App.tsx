import { useQuery } from "@tanstack/react-query";
import CourseCard from "./components/Atoms/CourseCard";
import Api from "./api/course";
import ICourse from "./types/ICourse";
import "./App.css";

function App() {
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
  } = useQuery<ICourse[], Error>({
    queryKey: ["courses"],
    queryFn: Api.getApiData,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar cursos: {(error as Error).message}</div>;
  }

  return (
    <>
      <div>OI</div>
      <div>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}

export default App;
