function VehicleHistory({
  history
}) {

  if (!history.length) {

    return (
      <div className="
        rounded-2xl
        bg-slate-900
        p-8
        text-center
      ">

        <h3 className="
          text-2xl
          font-bold
        ">
          No Diagnosis History
        </h3>

        <p className="
          mt-3
          text-slate-400
        ">
          Previous vehicle diagnoses
          will appear here.
        </p>

      </div>
    )
  }


  return (
    <div className="
      rounded-2xl
      bg-slate-900
      p-8
    ">

      <div className="
        mb-6
        flex
        items-center
        justify-between
      ">

        <h3 className="
          text-2xl
          font-bold
        ">
          Diagnosis History
        </h3>

        <span className="
          rounded-full
          bg-slate-800
          px-4
          py-2
          text-sm
        ">

          {history.length}
          {" "}
          Records

        </span>

      </div>


      <div className="
        overflow-x-auto
      ">

        <table className="
          min-w-full
          divide-y
          divide-slate-700
        ">

          <thead className="
            bg-slate-800
          ">

            <tr>

              <th className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
              ">
                Vehicle
              </th>

              <th className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
              ">
                Fault Codes
              </th>

              <th className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
              ">
                Root Cause
              </th>

              <th className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
              ">
                Severity
              </th>

              <th className="
                px-6
                py-4
                text-left
                text-sm
                font-semibold
              ">
                Cost
              </th>

            </tr>

          </thead>


          <tbody className="
            divide-y
            divide-slate-700
          ">

            {history.map((item) => (

              <tr
                key={item.diagnosis_id}
                className="
                  hover:bg-slate-800
                  transition-colors
                "
              >

                <td className="
                  px-6
                  py-4
                ">
                  {item.vehicle}
                </td>

                <td className="
                  px-6
                  py-4
                ">

                  <div className="
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {item.fault_codes_analyzed.map(
                      (code) => (

                      <span
                        key={code}
                        className="
                          rounded-full
                          bg-blue-600
                          px-3
                          py-1
                          text-xs
                        "
                      >
                        {code}
                      </span>
                    ))}

                  </div>

                </td>

                <td className="
                  max-w-sm
                  px-6
                  py-4
                  text-slate-300
                ">
                  {item.root_cause}
                </td>

                <td className="
                  px-6
                  py-4
                ">

                  <span className="
                    rounded-full
                    bg-slate-700
                    px-3
                    py-1
                    text-sm
                  ">

                    {
                      item.severity_score
                    }
                    {" / 5"}

                  </span>

                </td>

                <td className="
                  px-6
                  py-4
                  text-green-400
                  font-semibold
                ">

                  ₹
                  {
                    item.estimated_cost_inr.min
                  }
                  {" - "}
                  ₹
                  {
                    item.estimated_cost_inr.max
                  }

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}


export default VehicleHistory