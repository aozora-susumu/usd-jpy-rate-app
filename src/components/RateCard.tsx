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
    let isMounted = true
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    async function loadRate() {
      try {
        if (!isMounted) return
        setLoading(true)
        setError(null)
        const rate = await fetchExchangeRate(selectedPair.base, selectedPair.target, controller.signal)
        if (isMounted) {
          setRate(rate)
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              setError('リクエストがタイムアウトしました（10秒以上応答がありません）')
            } else {
              setError(error.message)
            }
          } else {
            setError('Unknown error')
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadRate()

    return () => {
      isMounted = false
      clearTimeout(timeout)
      controller.abort()
    }
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
