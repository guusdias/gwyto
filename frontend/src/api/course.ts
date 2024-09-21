import axios from "axios";
import ICourse, { ICourseCreate } from "../types/ICourse";

class Api {
  static baseUrl = import.meta.env.VITE_API_URL;

  static async getApiData(
    page: number = 1,
    endDateFilter: string | null = null,
    title: string = ""
  ) {
    const params: { page: number; end_date?: string; title?: string } = {
      page,
    };
    if (endDateFilter) {
      params.end_date = endDateFilter;
    }
    if (title) {
      params.title = title;
    }

    return axios
      .get(`${Api.baseUrl}`, { params })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao obter cursos:", error);
        throw error;
      });
  }

  static async getCourseById(id: number) {
    return axios
      .get(`${Api.baseUrl}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Erro ao obter curso com ID ${id}:`, error);
        throw error;
      });
  }

  static async getCoursesStorageSum() {
    return axios
      .get(`${Api.baseUrl}/totalVideoSum`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao obter cursos:", error);
        throw error;
      });
  }

  static async createCourse(course: ICourseCreate) {
    return axios
      .post(Api.baseUrl, course)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro ao criar curso:", error);
        throw error;
      });
  }

  static async updateCourse(
    id: number,
    course: Partial<ICourse>
  ): Promise<ICourse> {
    return axios
      .put(`${Api.baseUrl}/${id}`, course)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Erro ao atualizar curso com ID ${id}:`, error);
        throw error;
      });
  }

  static async deleteCourse(id: number) {
    return axios
      .delete(`${Api.baseUrl}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Erro ao deletar curso com ID ${id}:`, error);
        throw error;
      });
  }
}

export default Api;
