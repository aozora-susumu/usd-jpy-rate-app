import { useEffect, useState } from 'react'
import { fetchExchangeRate } from './api'
import './App.css'

type CurrencyPair = {
  base: string
  target: string
  label: string
}

const CURRENCY_PAIRS: CurrencyPair[] = [
  { base: 'USD', target: 'JPY', label: 'USD/JPY' },
  { base: 'EUR', target: 'JPY', label: 'EUR/JPY' },
  { base: 'GBP', target: 'JPY', label: 'GBP/JPY' }
]

function App() {
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>(CURRENCY_PAIRS[0])

  useEffect(() => {
    async function loadRate() {
      try {
        setLoading(true)
        setError(null)
        const rate = await fetchExchangeRate(selectedPair.base, selectedPair.target)
        setRate(rate)
      } catch (error) {
        console.error(error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    loadRate()
  }, [selectedPair])

  return (
    <div>
      <h1>為替レート</h1>

      <div style={{ marginBottom: '20px' }}>
        {CURRENCY_PAIRS.map((pair) => (
          <button
            key={pair.label}
            onClick={() => setSelectedPair(pair)}
            style={{
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: selectedPair.label === pair.label ? '#007bff' : '#f8f9fa',
              color: selectedPair.label === pair.label ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {pair.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : error ? (
        <p>取得に失敗しました: {error}</p>
      ) : (
        <p>{rate ? `1 ${selectedPair.base} = ${rate} ${selectedPair.target}` : '取得に失敗しました'}</p>
      )}
    </div>
  )
}

export default App