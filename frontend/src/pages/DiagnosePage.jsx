import { useState } from "react"

import VehicleForm from "../components/VehicleForm"
import DiagnosisResult from "../components/DiagnosisResult"


function DiagnosePage() {

  const [result, setResult] =
    useState(null)


  return (
    <div className="
      min-h-screen
      bg-slate-950
      p-10
      text-white
    ">

      <VehicleForm
        setResult={setResult}
      />

      {result && (

        <DiagnosisResult
          result={result}
        />
      )}

    </div>
  )
}


export default DiagnosePage