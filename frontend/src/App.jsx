import { useState } from "react"
import FaultCodeInput from "./components/FaultCodeInput"


function App() {

  const [codes, setCodes] = useState([])

  return (
    <div className="p-10">

      <FaultCodeInput
        codes={codes}
        setCodes={setCodes}
      />

    </div>
  )
}

export default App