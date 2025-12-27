export default function KeyValueEditor({ items, setItems }) {
  const update = (i, field, value) => {
    const newItems = [...items]
    newItems[i][field] = value
    
    if (i === items.length - 1 && (newItems[i].key || newItems[i].value)) {
      newItems.push({ key: '', value: '', enabled: true })
    }
    setItems(newItems)
  }

  const toggle = (i) => {
    const newItems = [...items]
    newItems[i].enabled = !newItems[i].enabled
    setItems(newItems)
  }

  const remove = (i) => {
    if (items.length === 1) {
      setItems([{ key: '', value: '', enabled: true }])
    } else {
      setItems(items.filter((_, idx) => idx !== i))
    }
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.enabled}
            onChange={() => toggle(i)}
            className="w-4 h-4 accent-orange-500 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => update(i, 'key', e.target.value)}
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => update(i, 'value', e.target.value)}
            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <button onClick={() => remove(i)} className="text-gray-500 hover:text-red-400 p-1 cursor-pointer">
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
