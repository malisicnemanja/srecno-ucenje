# Google Maps Setup Guide

This guide will help you set up Google Maps for the Srećno učenje website.

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API (optional, for location search)
   - Geocoding API (optional, for address conversion)

4. Go to "Credentials" and create an API key
5. (Recommended) Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add your website URLs:
     - `http://localhost:3000/*`
     - `https://yourdomain.rs/*`
   - API restrictions: Restrict to the APIs you enabled

## 2. Add the API Key to Your Project

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your API key to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

## 3. Usage

The Google Maps component is located at `/components/map/GoogleLocationMap.tsx`.

### Features:
- **Two view modes**: Map view and List view
- **Location filtering**: All, Active, Coming Soon, Partner locations
- **Clustering**: Groups nearby markers at lower zoom levels
- **Info windows**: Click markers to see location details
- **Responsive design**: Works on all device sizes

### Adding New Locations:

Edit the `locationsData` array in `/components/map/GoogleLocationMap.tsx`:

```typescript
{
  id: '8',
  name: 'Srećno učenje Novi Grad',
  address: 'Adresa 123',
  city: 'Novi Grad',
  lat: 44.1234, // Latitude
  lng: 20.5678, // Longitude
  type: 'active', // or 'coming_soon' or 'partner'
  phone: '+381 11 999 9999',
  email: 'novigrad@srecno-ucenje.rs',
  programs: ['Brzo čitanje', 'Mentalna aritmetika'],
}
```

### Customization:

You can customize the map appearance by editing the `options` object:

```typescript
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    // Add custom map styles here
    // Get styles from: https://mapstyle.withgoogle.com/
  ],
}
```

## 4. Troubleshooting

### Map not showing?
- Check if the API key is correctly set in `.env.local`
- Ensure the Maps JavaScript API is enabled in Google Cloud Console
- Check browser console for any error messages

### "For development purposes only" watermark?
- Add billing to your Google Cloud account
- Or restrict the API key to your domains

### Quota exceeded?
- Google Maps provides $200 free credit monthly
- Monitor usage in Google Cloud Console
- Consider implementing caching or static maps for high traffic

## 5. Alternative: Mapbox

If you prefer Mapbox (already included in the project):
1. Get a token from [Mapbox](https://www.mapbox.com/)
2. Use the existing `/components/map/LocationsMap.tsx` component
3. Add to `.env.local`: `NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token`