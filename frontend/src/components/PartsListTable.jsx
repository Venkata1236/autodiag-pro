function PartsListTable({
  parts
}) {

  return (
    <div className="
      overflow-x-auto
      rounded-xl
      border
      border-slate-700
    ">

      <table className="
        min-w-full
        divide-y
        divide-slate-700
      ">

        <thead className="bg-slate-800">

          <tr>

            <th className="
              px-6
              py-4
              text-left
              text-sm
              font-semibold
            ">
              Part
            </th>

            <th className="
              px-6
              py-4
              text-left
              text-sm
              font-semibold
            ">
              OEM Price
            </th>

            <th className="
              px-6
              py-4
              text-left
              text-sm
              font-semibold
            ">
              Aftermarket
            </th>

            <th className="
              px-6
              py-4
              text-left
              text-sm
              font-semibold
            ">
              Availability
            </th>

          </tr>

        </thead>


        <tbody className="
          divide-y
          divide-slate-700
          bg-slate-900
        ">

          {parts.map((part, index) => (

            <tr
              key={index}
              className="
                hover:bg-slate-800
                transition-colors
              "
            >

              <td className="
                px-6
                py-4
                text-sm
              ">
                {part.part}
              </td>

              <td className="
                px-6
                py-4
                text-sm
                text-green-400
              ">
                ₹{part.oem_price_inr}
              </td>

              <td className="
                px-6
                py-4
                text-sm
                text-blue-400
              ">
                ₹{part.aftermarket_price_inr}
              </td>

              <td className="
                px-6
                py-4
                text-sm
                text-slate-300
              ">
                {part.availability}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}


export default PartsListTable