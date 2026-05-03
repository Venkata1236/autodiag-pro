import {
  Link
} from "react-router-dom"


function Navbar() {

  return (
    <nav className="
      flex
      items-center
      justify-between
      border-b
      border-slate-800
      bg-slate-950
      px-10
      py-6
    ">

      <Link
        to="/"
        className="
          text-2xl
          font-bold
          text-white
        "
      >
        AutoDiag Pro
      </Link>


      <div className="
        flex
        gap-6
      ">

        <Link
          to="/"
          className="
            text-slate-300
            hover:text-white
          "
        >
          Diagnose
        </Link>

        <Link
          to="/history"
          className="
            text-slate-300
            hover:text-white
          "
        >
          History
        </Link>

      </div>

    </nav>
  )
}


export default Navbar