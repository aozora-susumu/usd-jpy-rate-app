export async function fetchExchangeRate(baseCurrency: string, targetCurrency: string) {
  const res = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
  if (!res.ok) {
    throw new Error(`Exchange API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  console.log('API Response:', data)

  const rate = data?.rates?.[targetCurrency]
  if (rate === undefined) {
    throw new Error(`Exchange API returned invalid data. Response: ${JSON.stringify(data)}`)
  }

  return rate
}

// 後方互換性のため
export async function fetchUSDJPY() {
  return fetchExchangeRate('USD', 'JPY')
}