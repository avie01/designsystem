import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Maps, { MapMarker } from './Maps';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Maps> = {
  title: 'Design System/Components/Maps',
  component: Maps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive map component powered by OpenStreetMap and Leaflet. Supports markers, custom styles, and various map controls. No API key required.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    longitude: {
      control: { type: 'number', min: -180, max: 180, step: 0.1 },
      description: 'Center longitude',
    },
    latitude: {
      control: { type: 'number', min: -90, max: 90, step: 0.1 },
      description: 'Center latitude',
    },
    zoom: {
      control: { type: 'number', min: 0, max: 18, step: 1 },
      description: 'Zoom level',
    },
    tileStyle: {
      control: 'select',
      options: ['standard', 'humanitarian', 'topo', 'cycle'],
      description: 'Map tile style',
    },
    width: {
      control: 'text',
      description: 'Map width',
    },
    height: {
      control: 'text',
      description: 'Map height',
    },
    showFullscreenControl: {
      control: 'boolean',
      description: 'Show fullscreen toggle button',
    },
    showLayerControl: {
      control: 'boolean',
      description: 'Show layer switching control',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12,
    height: '500px',
  },
};

export const WithMarkers: Story = {
  name: '02 With Markers',
  render: () => {
    const markers: MapMarker[] = [
      { id: '1', longitude: -74.006, latitude: 40.7128, color: '#0F62FE', popup: '<strong>New York City</strong><br/>The Big Apple' },
      { id: '2', longitude: -73.985, latitude: 40.748, color: '#198038', popup: '<strong>Empire State Building</strong><br/>Iconic landmark' },
      { id: '3', longitude: -74.0445, latitude: 40.6892, color: '#DA1E28', popup: '<strong>Statue of Liberty</strong><br/>National monument' },
    ];

    return (
      <Maps
        longitude={-74.006}
        latitude={40.7128}
        zoom={11}
        height="500px"
        markers={markers}
      />
    );
  },
};

export const HumanitarianStyle: Story = {
  name: '03 Humanitarian Style',
  args: {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    height: '500px',
    tileStyle: 'humanitarian',
  },
};

export const TopoStyle: Story = {
  name: '04 Topo Style',
  args: {
    longitude: -105.2705,
    latitude: 40.015,
    zoom: 10,
    height: '500px',
    tileStyle: 'topo',
  },
};

export const CycleStyle: Story = {
  name: '05 Cycle Style',
  args: {
    longitude: 2.3522,
    latitude: 48.8566,
    zoom: 13,
    height: '500px',
    tileStyle: 'cycle',
  },
};

export const MultipleLocations: Story = {
  name: '06 Multiple Locations',
  render: () => {
    const { colors } = useTheme();
    const [selectedCity, setSelectedCity] = useState('new-york');

    const cities = {
      'new-york': { name: 'New York', lng: -74.006, lat: 40.7128, zoom: 12 },
      'london': { name: 'London', lng: -0.1276, lat: 51.5074, zoom: 12 },
      'tokyo': { name: 'Tokyo', lng: 139.6917, lat: 35.6895, zoom: 12 },
      'sydney': { name: 'Sydney', lng: 151.2093, lat: -33.8688, zoom: 12 },
      'paris': { name: 'Paris', lng: 2.3522, lat: 48.8566, zoom: 12 },
    };

    const currentCity = cities[selectedCity as keyof typeof cities];

    return (
      <div>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {Object.entries(cities).map(([key, city]) => (
            <button
              key={key}
              onClick={() => setSelectedCity(key)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCity === key ? colors.primaryMain : colors.grey300,
                color: selectedCity === key ? colors.textInverse : colors.textPrimary,
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
            >
              {city.name}
            </button>
          ))}
        </div>
        <Maps
          longitude={currentCity.lng}
          latitude={currentCity.lat}
          zoom={currentCity.zoom}
          height="500px"
          markers={[
            {
              id: selectedCity,
              longitude: currentCity.lng,
              latitude: currentCity.lat,
              color: colors.primaryMain,
              popup: `<strong>${currentCity.name}</strong>`,
            },
          ]}
        />
      </div>
    );
  },
};

export const WithMarkerClick: Story = {
  name: '07 With Marker Click',
  render: () => {
    const { colors } = useTheme();
    const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

    const markers: MapMarker[] = [
      { id: '1', longitude: -0.1276, latitude: 51.5074, color: '#0F62FE', popup: '<strong>London</strong>' },
      { id: '2', longitude: -0.0762, latitude: 51.5085, color: '#198038', popup: '<strong>Tower Bridge</strong>' },
      { id: '3', longitude: -0.1419, latitude: 51.5014, color: '#DA1E28', popup: '<strong>Buckingham Palace</strong>' },
      { id: '4', longitude: -0.1246, latitude: 51.5007, color: '#6929C4', popup: '<strong>Big Ben</strong>' },
    ];

    return (
      <div>
        <Maps
          longitude={-0.1276}
          latitude={51.5074}
          zoom={13}
          height="500px"
          markers={markers}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
          <p style={{ margin: 0, color: colors.textPrimary }}>
            {selectedMarker
              ? `Selected: ${selectedMarker.popup?.replace(/<[^>]*>/g, '')}`
              : 'Click on a marker to select it'}
          </p>
        </div>
      </div>
    );
  },
};

export const SmallMap: Story = {
  name: '08 Small Map',
  args: {
    longitude: 139.6917,
    latitude: 35.6895,
    zoom: 10,
    width: '300px',
    height: '200px',
  },
};

export const WithFullscreen: Story = {
  name: '09 With Fullscreen',
  args: {
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    height: '500px',
    showFullscreenControl: true,
  },
};

export const WithLayerControl: Story = {
  name: '10 With Layer Control',
  args: {
    longitude: -0.1276,
    latitude: 51.5074,
    zoom: 12,
    height: '500px',
    showLayerControl: true,
  },
};

export const FullFeatured: Story = {
  name: '11 Full Featured',
  render: () => {
    const { colors } = useTheme();
    const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

    const markers: MapMarker[] = [
      { id: '1', longitude: -122.4194, latitude: 37.7749, color: '#0F62FE', popup: '<strong>San Francisco</strong><br/>California' },
      { id: '2', longitude: -122.4089, latitude: 37.7855, color: '#198038', popup: '<strong>Chinatown</strong><br/>Historic district' },
      { id: '3', longitude: -122.4783, latitude: 37.8199, color: '#DA1E28', popup: '<strong>Golden Gate Bridge</strong><br/>Iconic landmark' },
    ];

    return (
      <div>
        <Maps
          longitude={-122.4194}
          latitude={37.7749}
          zoom={12}
          height="500px"
          markers={markers}
          showFullscreenControl={true}
          showLayerControl={true}
          onMarkerClick={(marker) => setSelectedMarker(marker)}
        />
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
          <p style={{ margin: 0, color: colors.textPrimary }}>
            {selectedMarker
              ? `Selected: ${selectedMarker.popup?.replace(/<[^>]*>/g, '')}`
              : 'Click on a marker to select it. Use layer control to switch map styles. Click fullscreen for immersive view.'}
          </p>
        </div>
      </div>
    );
  },
};
