import { useState } from "react"

import {
  normalizeFaultCode,
  validateFaultCode,
  validateFaultCodeLimit
} from "../utils/validators"


const COMMON_CODES = [
  "P0300",
  "P0420",
  "P0171",
  "P0442"
]


function FaultCodeInput({
  codes,
  setCodes
}) {

  const [input, setInput] = useState("")

  const [error, setError] = useState("")


  const addCode = (rawCode) => {

    const code = normalizeFaultCode(
      rawCode
    )

    if (!validateFaultCode(code)) {

      setError(
        "Invalid DTC format"
      )

      return
    }

    if (codes.includes(code)) {

      setError(
        "Code already added"
      )

      return
    }

    const updatedCodes = [
      ...codes,
      code
    ]

    if (
      !validateFaultCodeLimit(
        updatedCodes
      )
    ) {

      setError(
        "Maximum 10 codes allowed"
      )

      return
    }

    setCodes(updatedCodes)

    setInput("")

    setError("")
  }


  const removeCode = (code) => {

    setCodes(
      codes.filter(
        item => item !== code
      )
    )
  }


  const handleKeyDown = (event) => {

    if (event.key === "Enter") {

      event.preventDefault()

      addCode(input)
    }
  }


  return (
    <div className="space-y-4">

      <div>

        <label className="block mb-2 text-sm font-medium">
          Fault Codes
        </label>

        <input
          type="text"
          placeholder="Enter DTC code (Example: P0300)"
          value={input}
          onChange={(event) =>
            setInput(
              event.target.value.toUpperCase()
            )
          }
          onKeyDown={handleKeyDown}
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-white
            outline-none
            focus:border-blue-500
          "
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}

      </div>


      <div className="flex flex-wrap gap-2">

        {codes.map((code) => (

          <div
            key={code}
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
            "
          >

            <span>
              {code}
            </span>

            <button
              onClick={() =>
                removeCode(code)
              }
              className="
                text-white
                hover:text-red-300
              "
            >
              ×
            </button>

          </div>
        ))}

      </div>


      <div>

        <p className="mb-2 text-sm text-slate-400">
          Common Codes
        </p>

        <div className="flex flex-wrap gap-2">

          {COMMON_CODES.map((code) => (

            <button
              key={code}
              onClick={() =>
                addCode(code)
              }
              className="
                rounded-lg
                border
                border-slate-700
                bg-slate-800
                px-3
                py-2
                text-sm
                hover:bg-slate-700
              "
            >
              {code}
            </button>
          ))}

        </div>

      </div>

    </div>
  )
}


export default FaultCodeInput