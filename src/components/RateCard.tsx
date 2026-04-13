import { useEffect, useState } from 'react'
import { fetchExchangeRate } from '../api/fetchRates'
import './RateCard.css'

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

export function RateCard() {
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
    <div className='container'>
      <h1>為替レート</h1>

      <div className="button-container">
        {CURRENCY_PAIRS.map((pair) => (
          <button
            key={pair.label}
            onClick={() => setSelectedPair(pair)}
            className={`currency-button ${selectedPair.label === pair.label ? 'selected' : ''}`}
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
