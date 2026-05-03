const SEVERITY_LABELS = {
  1: "MINOR",
  2: "LOW",
  3: "MODERATE",
  4: "SERIOUS",
  5: "CRITICAL"
}


function SeverityGauge({
  severity
}) {

  const getBarColor = (
    index
  ) => {

    if (severity >= 5) {
      return "bg-red-500"
    }

    if (severity >= 4) {
      return "bg-orange-500"
    }

    if (severity >= 3) {
      return "bg-yellow-500"
    }

    return "bg-green-500"
  }


  return (
    <div className="space-y-4">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h4 className="
          text-lg
          font-bold
        ">
          Urgency Level
        </h4>

        <span className="
          rounded-full
          bg-slate-700
          px-4
          py-1
          text-sm
          font-semibold
        ">

          {
            SEVERITY_LABELS[
              severity
            ]
          }

        </span>

      </div>


      <div className="
        flex
        gap-2
      ">

        {[1, 2, 3, 4, 5].map(
          (level) => (

          <div
            key={level}
            className={`
              h-4
              flex-1
              rounded-full
              transition-all

              ${
                level <= severity
                  ? getBarColor(level)
                  : "bg-slate-700"
              }
            `}
          />
        ))}

      </div>


      <p className="
        text-sm
        text-slate-400
      ">

        Severity:
        {" "}
        {severity}
        {" / 5"}

      </p>

    </div>
  )
}


export default SeverityGauge