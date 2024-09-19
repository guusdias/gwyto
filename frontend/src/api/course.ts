import axios from "axios";

class Api {
  static getApiData() {
    return axios
      .get(import.meta.env.VITE_API_URL)
      .then((response) => response.data);
  }
}

export default Api;
