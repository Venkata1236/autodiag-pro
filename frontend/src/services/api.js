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


export const askMechanicAssistant =
  async (payload, onChunk) => {

    const response = await fetch(
      "http://127.0.0.1:8000/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(payload)
      }
    )

    const reader =
      response.body.getReader()

    const decoder =
      new TextDecoder()

    let fullText = ""

    while (true) {

      const {
        done,
        value
      } = await reader.read()

      if (done) {
        break
      }

      const chunk =
        decoder.decode(value)

      fullText += chunk

      onChunk(fullText)
    }

    return fullText
  }


export default api