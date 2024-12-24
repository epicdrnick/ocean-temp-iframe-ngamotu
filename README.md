# Ngamotu Beach Temperature Dashboard - Home Assistant Addon

This addon provides a beautiful dashboard showing water temperature data for Ngamotu Beach, New Plymouth, using StormGlass.io API.

## Features
- Real-time water temperature display
- 24-hour temperature trend
- Beautiful, responsive design with frosted glass UI
- StormGlass.io API integration with rate limiting (10 calls per day)

## Installation

1. In Home Assistant, navigate to **Settings** → **Add-ons** → **Add-on Store**
2. Click the menu (⋮) → **Repositories**
3. Add this repository URL: `https://github.com/YOUR_USERNAME/ngamotu-temperature-addon`
4. Click **Add**
5. Find "Ngamotu Beach Temperature Dashboard" in the addon list
6. Click **Install**

## Configuration

1. Get your API key from [StormGlass.io](https://stormglass.io)
2. In the addon configuration, set your StormGlass API key:

```yaml
stormglass_api_key: your_api_key_here
```

3. Start the addon
4. Access the dashboard at: `http://your-home-assistant:8099`

## Usage

The dashboard will automatically fetch data from StormGlass.io once every 2.4 hours (to stay within the 10 requests per day limit). The data is cached and updated periodically.

## Development

To run this locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your StormGlass API key:
   ```
   STORMGLASS_API_KEY=your_api_key_here
   ```
4. Run: `npm run dev`

## Support

If you encounter any issues, please open an issue on GitHub.