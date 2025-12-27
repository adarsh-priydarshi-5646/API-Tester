import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await axios({
        method,
        url,
        data: body && method !== "GET" && method !== "DELETE" ? JSON.parse(body) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: () => true,
      });

      setResponse({
        status: res.status,
        headers: res.headers,
        data: res.data,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          API Tester
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border rounded-md px-3 py-2 bg-gray-50 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {methods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="https://api.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={sendRequest}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading || !url}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-gray-700">Request Body</h3>
          <textarea
            rows={6}
            placeholder='{"name":"John"}'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={'w-full border rounded-md p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'}
          />
        </div>

        <div>
          <h3 className="font-medium mb-2 text-gray-700">Response</h3>

          {!response && !error && (
            <p className="text-gray-500 text-sm">
              Send request to see response
            </p>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              Error: {error}
            </div>
          )}

          {response && (
            <div className="border rounded-md bg-gray-900 text-green-200 p-4 overflow-auto text-sm">
              <div className="mb-2 text-yellow-300">
                Status: {response.status}
              </div>
              <pre>{JSON.stringify(response.data, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
