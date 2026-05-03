import { useEffect, useState } from "react"

import VehicleHistory from "../components/VehicleHistory"

import {
  fetchDiagnosisHistory
} from "../services/api"


function HistoryPage() {

  const [history, setHistory] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")


  useEffect(() => {

    const loadHistory = async () => {

      try {

        const response =
          await fetchDiagnosisHistory()

        setHistory(
          response.data || []
        )

      } catch (err) {

        console.error(err)

        setError(
          "Failed to load history"
        )

      } finally {

        setLoading(false)
      }
    }

    loadHistory()

  }, [])


  if (loading) {

    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-950
        text-white
      ">

        Loading history...

      </div>
    )
  }


  if (error) {

    return (
      <div className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-950
        text-red-400
      ">

        {error}

      </div>
    )
  }


  return (
    <div className="
      min-h-screen
      bg-slate-950
      p-10
      text-white
    ">

      <VehicleHistory
        history={history}
      />

    </div>
  )
}


export default HistoryPage