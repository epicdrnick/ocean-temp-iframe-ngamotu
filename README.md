# Ngamotu Beach Temperature Dashboard - Home Assistant Addon Repository

This repository contains a Home Assistant addon that provides a beautiful dashboard showing water temperature data for Ngamotu Beach, New Plymouth, using the StormGlass.io API.

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
4. The dashboard will appear in your Home Assistant sidebar

## Features
- Real-time water temperature display
- 24-hour temperature trend
- Beautiful, responsive design with frosted glass UI
- StormGlass.io API integration with rate limiting (10 calls per day)
- Data is cached and updated every 2.4 hours to stay within API limits

## Support

If you encounter any issues, please open an issue on GitHub.