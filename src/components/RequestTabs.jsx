import { useState } from 'react'
import KeyValueEditor from './KeyValueEditor'

export default function RequestTabs({ form, updateForm }) {
  const [tab, setTab] = useState('params')

  const tabs = [
    { id: 'params', label: 'Params', count: form.params.filter(p => p.key).length },
    { id: 'headers', label: 'Headers', count: form.headers.filter(h => h.key).length },
    { id: 'body', label: 'Body'}
  ]

  return (
    <div className="flex-1 flex flex-col min-h-0 mb-4">
      <div className="flex border-b border-gray-600">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px cursor-pointer ${
              tab === t.id
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
            {t.count > 0 && <span className="ml-2 bg-gray-600 text-xs px-2 py-0.5 rounded-full">{t.count}</span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto py-4">
        {tab === 'params' && (
          <KeyValueEditor
            items={form.params}
            setItems={(val) => updateForm('params', val)}
          />
        )}
        {tab === 'headers' && (
          <KeyValueEditor
            items={form.headers}
            setItems={(val) => updateForm('headers', val)}
          />
        )}
        {tab === 'body' && (
          <textarea
            value={form.body}
            onChange={(e) => updateForm('body', e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-48 bg-gray-700 border border-gray-600 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-orange-500 resize-none"
          />
        )}
      </div>
    </div>
  )
}
