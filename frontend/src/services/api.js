import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
})


export const diagnoseVehicle =
  async (payload) => {

    const backendPayload = {
      vehicle: `${payload.vehicle_year} ${payload.vehicle_make} ${payload.vehicle_model}`,
      fault_codes:
        payload.fault_codes,
      symptoms:
        payload.symptoms
    }

    const response = await api.post(
      "/diagnose",
      backendPayload
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