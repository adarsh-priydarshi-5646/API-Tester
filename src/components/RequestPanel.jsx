import { useState, useEffect } from 'react'
import axios from 'axios'
import RequestTabs from './RequestTabs'
import ResponsePanel from './ResponsePanel'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const METHOD_COLORS = {
  GET: 'text-green-400',
  POST: 'text-yellow-400',
  PUT: 'text-blue-400',
  PATCH: 'text-purple-400',
  DELETE: 'text-red-400'
}

const emptyState = () => ({
  method: 'GET',
  url: '',
  params: [{ key: '', value: '', enabled: true }],
  headers: [{ key: '', value: '', enabled: true }],
  body: ''
})

export default function RequestPanel({ addToHistory, currentRequest }) {
  const [form, setForm] = useState(emptyState())
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(null)

  useEffect(() => {
    if (!currentRequest) return
    
    if (currentRequest.reset) {
      setForm(emptyState())
      setResponse(null)
    } else {
      setForm({
        method: currentRequest.method || 'GET',
        url: currentRequest.url || '',
        params: currentRequest.params || [{ key: '', value: '', enabled: true }],
        headers: currentRequest.headers || [{ key: '', value: '', enabled: true }],
        body: currentRequest.body || ''
      })
    }
  }, [currentRequest])

  const updateForm = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const buildUrl = () => {
    const activeParams = form.params.filter(p => p.enabled && p.key)
    if (!activeParams.length) return form.url
    const query = activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join('&')
    return form.url.includes('?') ? `${form.url}&${query}` : `${form.url}?${query}`
  }

  const sendRequest = async () => {
    if (!form.url) return
    setLoading(true)
    setResponse(null)
    const startTime = Date.now()

    try {
      const headerObj = { 'Content-Type': 'application/json' }
      form.headers.filter(h => h.enabled && h.key).forEach(h => {
        headerObj[h.key] = h.value
      })

      const res = await axios({
        method: form.method,
        url: buildUrl(),
        data: form.body && !['GET', 'DELETE'].includes(form.method) ? JSON.parse(form.body) : undefined,
        headers: headerObj,
        validateStatus: () => true
      })

      setResponseTime(Date.now() - startTime)
      setResponse({ status: res.status, headers: res.headers, data: res.data })
      
      addToHistory({
        ...form,
        timestamp: new Date().toISOString(),
        status: res.status
      })
    } catch (err) {
      setResponseTime(Date.now() - startTime)
      setResponse({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden bg-gray-800 rounded-lg">
      <div className="flex gap-2 mb-4">
        <select
          value={form.method}
          onChange={(e) => updateForm('method', e.target.value)}
          className={`bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 font-semibold cursor-pointer ${METHOD_COLORS[form.method]}`}
        >
          {METHODS.map(m => <option key={m} value={m} className="text-white bg-gray-800">{m}</option>)}
        </select>

        <input
          type="text"
          placeholder="Enter URL"
          value={form.url}
          onChange={(e) => updateForm('url', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
          className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
        />

        <button
          onClick={sendRequest}
          disabled={loading || !form.url}
          className="bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50 px-6 py-2 rounded-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <RequestTabs form={form} updateForm={updateForm} />
      <ResponsePanel response={response} responseTime={responseTime} loading={loading} />
    </div>
  )
}
