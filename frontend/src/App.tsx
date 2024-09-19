import { useEffect, useState } from "react";
import CourseCard from "./components/Atoms/CourseCard";
import Api from "./api/course";
import ICourse from "./types/ICourse";
import "./App.css";

function App() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    let mounted = true;

    Api.getApiData()
      .then((items) => {
        if (mounted) {
          console.log("Dados da API:", items);
          setCourses(items);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da API:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
