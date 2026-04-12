// Test which API works
(async () => {
  console.log('Testing exchangerate-api.com (free tier)...');
  try {
    const res = await fetch('https://v6.exchangerate-api.com/v6/latest/USD');
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(data, null, 2).substring(0, 500));
  } catch (e) {
    console.error('Error:', e.message);
  }

  console.log('\n\nTesting open.er-api.com...');
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data:', JSON.stringify(data, null, 2).substring(0, 500));
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
