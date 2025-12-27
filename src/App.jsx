import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import RequestPanel from './components/RequestPanel'
import History from './components/History'
import Footer from './components/Footer'
import { useState } from 'react'

export default function App() {
  const [history, setHistory] = useState([])
  const [currentRequest, setCurrentRequest] = useState(null)

  const addToHistory = (request) => {
    setHistory(prev => [request, ...prev.slice(0, 49)])
  }

  const newRequest = () => {
    setCurrentRequest({ reset: Date.now() })
  }

  const loadRequest = (request) => {
    setCurrentRequest(request)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden my-3 mx-3 gap-3">
        <Sidebar onNewRequest={newRequest} />
        <Routes>
          <Route path="/" element={
            <RequestPanel 
              addToHistory={addToHistory} 
              currentRequest={currentRequest}
            />
          } />
          <Route path="/history" element={
            <History history={history} onLoad={loadRequest} />
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
