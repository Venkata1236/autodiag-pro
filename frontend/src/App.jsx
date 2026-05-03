import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"

import DiagnosePage from "./pages/DiagnosePage"
import HistoryPage from "./pages/HistoryPage"


function App() {

  return (
    <BrowserRouter>

      <div className="
        min-h-screen
        bg-slate-950
      ">

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<DiagnosePage />}
          />

          <Route
            path="/history"
            element={<HistoryPage />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}


export default App