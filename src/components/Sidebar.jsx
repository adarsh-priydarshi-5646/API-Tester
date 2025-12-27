import { NavLink } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'
import { MdHistory } from 'react-icons/md'

export default function Sidebar({ onNewRequest }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
      isActive ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'
    }`

  return (
    <div className="w-56 bg-gray-800 p-4 flex flex-col rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold">
          A
        </div>
        <span className="text-xl font-semibold">AdarshAPI</span>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" onClick={onNewRequest} className={linkClass}>
          <HiPlus className="w-5 h-5" />
          New Request
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          <MdHistory className="w-5 h-5" />
          History
        </NavLink>
      </nav>
    </div>
  )
}
