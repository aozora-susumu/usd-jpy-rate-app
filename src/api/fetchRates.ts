export async function fetchExchangeRate(baseCurrency: string, targetCurrency: string, signal?: AbortSignal) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`, { signal })
  if (!res.ok) {
    throw new Error(`Exchange API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  const rate = data?.rates?.[targetCurrency]
  if (rate === undefined) {
    throw new Error(`Exchange API returned invalid data. Response: ${JSON.stringify(data)}`)
  }

  return rate
}