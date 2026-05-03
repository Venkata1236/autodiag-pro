import { useState } from "react"

import {
  diagnoseVehicle
} from "../services/api"


const COMMON_CODES = [
  "P0300",
  "P0420",
  "P0171",
  "P0442"
]


function VehicleForm({
  setResult
}) {

  const [faultInput, setFaultInput] =
    useState("")

  const [faultCodes, setFaultCodes] =
    useState([])

  const [vehicleMake, setVehicleMake] =
    useState("Hyundai")

  const [vehicleModel, setVehicleModel] =
    useState("i20")

  const [vehicleYear, setVehicleYear] =
    useState("2019")

  const [mileageKm, setMileageKm] =
    useState("45000")

  const [symptoms, setSymptoms] =
    useState(
      "rough idle, check engine light, poor acceleration"
    )

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")


  const addFaultCode = (code) => {

    const formattedCode =
      code.trim().toUpperCase()

    if (
      formattedCode &&
      !faultCodes.includes(formattedCode)
    ) {

      setFaultCodes(prev => [
        ...prev,
        formattedCode
      ])
    }

    setFaultInput("")
  }


  const removeFaultCode = (code) => {

    setFaultCodes(prev =>
      prev.filter(
        item => item !== code
      )
    )
  }


  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      event.preventDefault()

      addFaultCode(faultInput)
    }
  }


  const handleSubmit = async (
    event
  ) => {

    event.preventDefault()

    setError("")

    if (!faultCodes.length) {

      setError(
        "Add at least one fault code"
      )

      return
    }

    try {

      setLoading(true)

      const payload = {
        fault_codes: faultCodes,

        symptoms,

        vehicle_make: vehicleMake,

        vehicle_model: vehicleModel,

        vehicle_year:
          parseInt(vehicleYear),

        mileage_km:
          parseInt(mileageKm)
      }

      const response =
        await diagnoseVehicle(
          payload
        )

      setResult(response)

    } catch (error) {

      console.error(error)

      setError(
        "Diagnosis request failed"
      )

    } finally {

      setLoading(false)
    }
  }


  return (
    <div className="
      rounded-2xl
      bg-slate-900
      p-8
    ">

      <h2 className="
        mb-8
        text-4xl
        font-bold
      ">
        Diagnose Vehicle
      </h2>


      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        <div>

          <label className="
            mb-3
            block
            text-lg
            font-medium
          ">
            Fault Codes
          </label>

          <input
            type="text"
            value={faultInput}
            onChange={(event) =>
              setFaultInput(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder="
              Enter DTC code
              (Example: P0300)
            "
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-950
              px-5
              py-4
              outline-none
            "
          />

        </div>


        <div className="
          flex
          flex-wrap
          gap-3
        ">

          {faultCodes.map((code) => (

            <div
              key={code}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-blue-600
                px-5
                py-3
              "
            >

              <span>
                {code}
              </span>

              <button
                type="button"
                onClick={() =>
                  removeFaultCode(code)
                }
              >
                ×
              </button>

            </div>
          ))}

        </div>


        <div>

          <p className="
            mb-4
            text-lg
            text-slate-400
          ">
            Common Codes
          </p>

          <div className="
            flex
            flex-wrap
            gap-3
          ">

            {COMMON_CODES.map((code) => (

              <button
                key={code}
                type="button"
                onClick={() =>
                  addFaultCode(code)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-5
                  py-3
                  hover:bg-slate-700
                "
              >
                {code}
              </button>
            ))}

          </div>

        </div>


        <div className="
          grid
          grid-cols-2
          gap-6
        ">

          <div>

            <label className="
              mb-3
              block
              text-lg
              font-medium
            ">
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
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-5
                py-4
                outline-none
              "
            >

              <option>
                Hyundai
              </option>

              <option>
                Honda
              </option>

              <option>
                Toyota
              </option>

              <option>
                Ford
              </option>

            </select>

          </div>


          <div>

            <label className="
              mb-3
              block
              text-lg
              font-medium
            ">
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
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-5
                py-4
                outline-none
              "
            />

          </div>

        </div>


        <div className="
          grid
          grid-cols-2
          gap-6
        ">

          <div>

            <label className="
              mb-3
              block
              text-lg
              font-medium
            ">
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
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-5
                py-4
                outline-none
              "
            />

          </div>


          <div>

            <label className="
              mb-3
              block
              text-lg
              font-medium
            ">
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
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-5
                py-4
                outline-none
              "
            />

          </div>

        </div>


        <div>

          <label className="
            mb-3
            block
            text-lg
            font-medium
          ">
            Symptoms
          </label>

          <textarea
            rows="5"
            value={symptoms}
            onChange={(event) =>
              setSymptoms(
                event.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-5
              py-4
              outline-none
            "
          />

        </div>


        {error && (

          <div className="
            rounded-xl
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
            px-8
            py-4
            text-lg
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

      </form>

    </div>
  )
}


export default VehicleForm