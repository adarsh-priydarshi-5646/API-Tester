import { useState } from 'react'

export default function ResponsePanel({ response, responseTime, loading }) {
  const [tab, setTab] = useState('body')

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400 bg-green-400/10'
    if (status >= 400) return 'text-red-400 bg-red-400/10'
    return 'text-yellow-400 bg-yellow-400/10'
  }

  if (loading) {
    return (
      <div className="flex-1 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
        Sending...
      </div>
    )
  }

  if (!response) {
    return (
      <div className="flex-1 bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
        Enter URL and click Send
      </div>
    )
  }

  if (response.error) {
    return (
      <div className="flex-1 bg-gray-700 rounded-lg p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
          Error: {response.error}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-700 rounded-lg flex flex-col min-h-0">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-600">
        <span className={`px-3 py-1 rounded font-semibold text-sm ${getStatusColor(response.status)}`}>
          {response.status}
        </span>
        <span className="text-gray-400 text-sm">{responseTime}ms</span>
      </div>

      <div className="flex border-b border-gray-600">
        {['body', 'headers'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize transition border-b-2 -mb-px cursor-pointer ${
              tab === t ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {tab === 'body' && (
          <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        )}
        {tab === 'headers' && (
          <div className="space-y-2">
            {Object.entries(response.headers).map(([k, v]) => (
              <div key={k} className="flex text-sm">
                <span className="text-purple-400 w-48">{k}:</span>
                <span className="text-gray-300">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
