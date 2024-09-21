import axios from "axios";
import { ILesson, ILessonCreate } from "../types/ICourse";

class ApiLesson {
  static baseUrl = import.meta.env.VITE_API_URL;

  static async createLesson(
    courseId: number,
    lesson: ILessonCreate
  ): Promise<ILesson> {
    return axios
      .post(`${ApiLesson.baseUrl}/courses/${courseId}/lessons`, lesson)
      .then((response) => response.data);
  }

  static async updateLesson(
    courseId: number,
    lessonId: number,
    lesson: Partial<ILesson>
  ): Promise<ILesson> {
    return axios
      .put(
        `${ApiLesson.baseUrl}/courses/${courseId}/lessons/${lessonId}`,
        lesson
      )
      .then((response) => response.data);
  }

  static async deleteLesson(courseId: number, lessonId: number): Promise<void> {
    return axios
      .delete(`${ApiLesson.baseUrl}/courses/${courseId}/lessons/${lessonId}`)
      .then((response) => response.data);
  }
}

export default ApiLesson;
