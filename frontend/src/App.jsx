import VehicleForm from "./components/VehicleForm"
import VehicleHistory from "./components/VehicleHistory"


const MOCK_HISTORY = [
  {
    diagnosis_id: "1",
    vehicle: "2019 Hyundai i20",
    fault_codes_analyzed: [
      "P0300",
      "P0420"
    ],
    root_cause:
      "Faulty oxygen sensor",
    severity_score: 3,
    estimated_cost_inr: {
      min: 4000,
      max: 9000
    }
  }
]


function App() {

  return (
    <div className="
      min-h-screen
      space-y-10
      bg-slate-950
      p-10
      text-white
    ">

      <VehicleForm />

      <VehicleHistory
        history={MOCK_HISTORY}
      />

    </div>
  )
}


export default App