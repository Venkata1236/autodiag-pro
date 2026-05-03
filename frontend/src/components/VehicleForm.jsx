import { useState } from "react"

import FaultCodeInput from "./FaultCodeInput"

import {
  diagnoseVehicle
} from "../services/api"
import DiagnosisResult from "./DiagnosisResult"

const VEHICLE_MAKES = [
  "Maruti",
  "Hyundai",
  "Honda",
  "Toyota",
  "Tata",
  "Kia",
  "Mahindra",
  "Ford",
  "Volkswagen",
  "Skoda",
  "MG",
  "Other"
]


function VehicleForm() {

  const [codes, setCodes] = useState([])

  const [vehicleMake, setVehicleMake] =
    useState("Hyundai")

  const [vehicleModel, setVehicleModel] =
    useState("i20")

  const [vehicleYear, setVehicleYear] =
    useState(2019)

  const [mileageKm, setMileageKm] =
    useState(45000)

  const [symptoms, setSymptoms] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [response, setResponse] =
    useState(null)

  const [error, setError] =
    useState("")


  const handleSubmit = async (
    event
  ) => {

    event.preventDefault()

    if (codes.length === 0) {

      setError(
        "Add at least one fault code"
      )

      return
    }

    try {

      setLoading(true)

      setError("")

      const payload = {
        fault_codes: codes,
        symptoms,
        vehicle_make: vehicleMake,
        vehicle_model: vehicleModel,
        vehicle_year: Number(vehicleYear),
        mileage_km: Number(mileageKm)
      }

      const result =
        await diagnoseVehicle(payload)

      setResponse(result)

    } catch (err) {

      setError(
        "Diagnosis request failed"
      )

      console.error(err)

    } finally {

      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-4xl
        space-y-6
        rounded-2xl
        bg-slate-900
        p-8
      "
    >

      <h2 className="text-2xl font-bold">
        Diagnose Vehicle
      </h2>


      <FaultCodeInput
        codes={codes}
        setCodes={setCodes}
      />


      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm">
            Vehicle Make
          </label>

          <select
            value={vehicleMake}
            onChange={(event) =>
              setVehicleMake(
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
            "
          >

            {VEHICLE_MAKES.map((make) => (

              <option
                key={make}
                value={make}
              >
                {make}
              </option>
            ))}

          </select>

        </div>


        <div>

          <label className="mb-2 block text-sm">
            Vehicle Model
          </label>

          <input
            type="text"
            value={vehicleModel}
            onChange={(event) =>
              setVehicleModel(
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
            "
          />

        </div>

      </div>


      <div className="grid grid-cols-2 gap-4">

        <div>

          <label className="mb-2 block text-sm">
            Vehicle Year
          </label>

          <input
            type="number"
            value={vehicleYear}
            onChange={(event) =>
              setVehicleYear(
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
            "
          />

        </div>


        <div>

          <label className="mb-2 block text-sm">
            Mileage (km)
          </label>

          <input
            type="number"
            value={mileageKm}
            onChange={(event) =>
              setMileageKm(
                event.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
            "
          />

        </div>

      </div>


      <div>

        <label className="mb-2 block text-sm">
          Symptoms
        </label>

        <textarea
          rows={5}
          placeholder="
            rough idle,
            check engine light,
            poor acceleration
          "
          value={symptoms}
          onChange={(event) =>
            setSymptoms(
              event.target.value
            )
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            px-4
            py-3
          "
        />

      </div>


      {error && (

        <div className="
          rounded-lg
          bg-red-500/20
          p-4
          text-red-300
        ">
          {error}
        </div>
      )}


      <button
        type="submit"
        disabled={loading}
        className="
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-semibold
          hover:bg-blue-500
          disabled:opacity-50
        "
      >

        {loading
          ? "Diagnosing..."
          : "Diagnose Vehicle"
        }

      </button>


      {response && (
        <DiagnosisResult
            result={response}
        />
    )}

        </div>
      )}

    </form>
  )
}


export default VehicleForm