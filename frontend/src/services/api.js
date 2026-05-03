import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
})


export const diagnoseVehicle =
  async (payload) => {

    const response = await api.post(
      "/diagnose",
      payload
    )

    return response.data
  }


export const fetchDiagnosisHistory =
  async () => {

    const response = await api.get(
      "/history"
    )

    return response.data
  }


export default api