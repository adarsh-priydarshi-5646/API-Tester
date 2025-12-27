import { useNavigate } from 'react-router-dom'

const METHOD_COLORS = {
  GET: 'bg-green-500/20 text-green-400',
  POST: 'bg-yellow-500/20 text-yellow-400',
  PUT: 'bg-blue-500/20 text-blue-400',
  PATCH: 'bg-purple-500/20 text-purple-400',
  DELETE: 'bg-red-500/20 text-red-400'
}

export default function History({ history, onLoad }) {
  const navigate = useNavigate()

  const handleClick = (req) => {
    onLoad(req)
    navigate('/')
  }

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400'
    if (status >= 400) return 'text-red-400'
    return 'text-yellow-400'
  }

  if (!history.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-800 rounded-lg">
        <div className="text-center">
          <p>No history yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-800 rounded-lg">
      <h2 className="text-xl font-semibold mb-6">History</h2>
      
      <div className="space-y-3">
        {history.map((req, i) => (
          <div
            key={i}
            onClick={() => handleClick(req)}
            className="bg-gray-700 rounded-lg p-4 cursor-pointer border border-gray-600 hover:border-orange-500/50 transition"
          >
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${METHOD_COLORS[req.method]}`}>
                {req.method}
              </span>
              <span className="flex-1 text-sm truncate text-gray-300">{req.url}</span>
              <span className={`text-sm font-medium ${getStatusColor(req.status)}`}>{req.status}</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {new Date(req.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
