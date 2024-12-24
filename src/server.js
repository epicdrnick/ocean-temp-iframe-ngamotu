const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8099;

let lastFetchTime = 0;
let cachedData = null;
const CACHE_DURATION = 1000 * 60 * 60 * 2.4; // 2.4 hours in milliseconds

const STORMGLASS_ENDPOINT = 'https://api.stormglass.io/v2/weather/point';
const NGAMOTU_LAT = -39.0556;
const NGAMOTU_LONG = 174.0452;

async function fetchStormGlassData() {
  const now = Date.now();
  
  // Return cached data if it's still valid
  if (cachedData && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const endTime = new Date();
    const startTime = new Date(endTime);
    startTime.setHours(startTime.getHours() - 24);

    const response = await fetch(
      `${STORMGLASS_ENDPOINT}?lat=${NGAMOTU_LAT}&lng=${NGAMOTU_LONG}&params=waterTemperature&start=${startTime.toISOString()}&end=${endTime.toISOString()}`,
      {
        headers: {
          'Authorization': process.env.STORMGLASS_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`StormGlass API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data
    const transformedData = {
      current: {
        temperature: data.hours[data.hours.length - 1].waterTemperature.sg
      },
      history: data.hours.map(hour => ({
        temperature: hour.waterTemperature.sg,
        time: new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }))
    };

    // Update cache
    cachedData = transformedData;
    lastFetchTime = now;

    return transformedData;
  } catch (error) {
    console.error('Error fetching StormGlass data:', error);
    throw error;
  }
}

// Serve static files from the build directory
app.use(express.static('dist'));

// API endpoint
app.get('/api/temperature', async (req, res) => {
  try {
    const data = await fetchStormGlassData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});