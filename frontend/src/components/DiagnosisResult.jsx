import SeverityGauge from "./SeverityGauge"
import PartsListTable from "./PartsListTable"

import {
  exportDiagnosisReport
} from "../utils/exportReport"


function DiagnosisResult({
  result
}) {

  const downloadReport = async () => {

    await exportDiagnosisReport(
      "diagnosis-report",
      `autodiag-${result.diagnosis_id}`
    )
  }


  return (
    <div
      id="diagnosis-report"
      className="
        mt-8
        space-y-6
        rounded-2xl
        bg-slate-900
        p-8
      "
    >

      <div className="
        flex
        items-start
        justify-between
        gap-6
      ">

        <div>

          <h2 className="
            text-3xl
            font-bold
          ">
            Diagnosis Result
          </h2>

          <p className="
            mt-2
            text-slate-400
          ">
            {result.vehicle}
          </p>

        </div>


        <button
          onClick={downloadReport}
          className="
            rounded-xl
            bg-green-600
            px-5
            py-3
            font-semibold
            hover:bg-green-500
          "
        >
          Download Report
        </button>

      </div>


      <div className="
        rounded-xl
        bg-slate-800
        p-6
      ">

        <p className="
          text-sm
          text-slate-400
        ">
          Root Cause
        </p>

        <h3 className="
          mt-2
          text-2xl
          font-semibold
        ">
          {result.root_cause}
        </h3>

      </div>


      <div className="
        grid
        grid-cols-2
        gap-4
      ">

        <div className="
          rounded-xl
          bg-slate-800
          p-6
        ">

          <p className="
            text-sm
            text-slate-400
          ">
            Confidence
          </p>

          <p className="
            mt-2
            text-xl
            font-bold
          ">
            {
              result.root_cause_confidence
            }
          </p>

        </div>


        <div className="
          rounded-xl
          bg-slate-800
          p-6
        ">

          <SeverityGauge
            severity={
              result.severity_score
            }
          />

        </div>

      </div>


      {result.safety_warning && (

        <div className="
          rounded-xl
          border
          border-red-500
          bg-red-500/10
          p-6
        ">

          <h4 className="
            text-lg
            font-bold
            text-red-400
          ">
            Safety Warning
          </h4>

          <p className="
            mt-2
            text-red-300
          ">
            {result.safety_warning}
          </p>

        </div>
      )}


      <div className="
        rounded-xl
        bg-slate-800
        p-6
      ">

        <h4 className="
          text-xl
          font-bold
        ">
          Repair Summary
        </h4>

        <p className="
          mt-4
          leading-relaxed
          text-slate-300
        ">
          {result.summary}
        </p>

      </div>


      <div className="
        rounded-xl
        bg-slate-800
        p-6
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h4 className="
            text-xl
            font-bold
          ">
            Parts & Cost Estimate
          </h4>

          <p className="
            text-2xl
            font-bold
            text-green-400
          ">

            ₹
            {result.estimated_cost_inr.min}
            {" - "}
            ₹
            {result.estimated_cost_inr.max}

          </p>

        </div>


        <div className="mt-6">

          <PartsListTable
            parts={result.parts_list}
          />

        </div>

      </div>


      <div className="
        rounded-xl
        bg-slate-800
        p-6
      ">

        <h4 className="
          text-xl
          font-bold
        ">
          Fix Sequence
        </h4>

        <div className="
          mt-6
          space-y-4
        ">

          {result.fix_sequence.map(
            (step) => (

            <div
              key={step.step}
              className="
                rounded-lg
                border
                border-slate-700
                p-4
              "
            >

              <div className="
                flex
                items-center
                justify-between
              ">

                <h5 className="
                  text-lg
                  font-semibold
                ">
                  Step {step.step}
                </h5>

                <span className="
                  rounded-full
                  bg-blue-600
                  px-3
                  py-1
                  text-sm
                ">
                  {step.difficulty}
                </span>

              </div>

              <p className="
                mt-3
                text-slate-300
              ">
                {step.action}
              </p>

              <div className="
                mt-3
                flex
                gap-6
                text-sm
                text-slate-400
              ">

                <span>
                  Tool:
                  {" "}
                  {step.tool_needed}
                </span>

                <span>
                  Time:
                  {" "}
                  {
                    step.estimated_time_minutes
                  }
                  {" "}
                  mins
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}


export default DiagnosisResult