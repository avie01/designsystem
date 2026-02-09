import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

export interface MapMarker {
  id: string;
  longitude: number;
  latitude: number;
  color?: string;
  popup?: string;
}

export interface MapsProps {
  longitude?: number;
  latitude?: number;
  zoom?: number;
  width?: string;
  height?: string;
  markers?: MapMarker[];
  tileStyle?: 'standard' | 'humanitarian' | 'topo' | 'cycle';
  onMarkerClick?: (marker: MapMarker) => void;
  showFullscreenControl?: boolean;
  showLayerControl?: boolean;
}

const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

const MapController: React.FC<MapControllerProps> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapResizeHandler: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const invalidateSize = () => {
      map.invalidateSize();
    };

    invalidateSize();
    const timeoutId = setTimeout(invalidateSize, 100);
    const timeoutId2 = setTimeout(invalidateSize, 300);

    const container = map.getContainer().parentElement;
    let resizeObserver: ResizeObserver | null = null;

    if (container && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        invalidateSize();
      });
      resizeObserver.observe(container);
    }

    window.addEventListener('resize', invalidateSize);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', invalidateSize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [map]);

  return null;
};

const getTileUrl = (style: string) => {
  switch (style) {
    case 'humanitarian':
      return 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    case 'topo':
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    case 'cycle':
      return 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
    default:
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  }
};

const getAttribution = (style: string) => {
  switch (style) {
    case 'humanitarian':
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">HOT</a>';
    case 'topo':
      return 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>';
    case 'cycle':
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles by <a href="https://www.cyclosm.org">CyclOSM</a>';
    default:
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }
};

const FullscreenControl: React.FC = () => {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = map.getContainer().parentElement;

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(() => map.invalidateSize(), 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [map]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
      }}
    >
      <button
        onClick={toggleFullscreen}
        style={{
          width: '34px',
          height: '34px',
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
        }}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? '⛶' : '⛶'}
      </button>
    </div>
  );
};

const layerControlStyles = `
  .leaflet-control-layers-toggle {
    width: 34px !important;
    height: 34px !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='%23161616'%3E%3Cpath d='M29.4741,19.12,23.6807,16l5.7934-3.12a1,1,0,0,0,0-1.7607l-13-7a.9982.9982,0,0,0-.9482,0l-13,7a1,1,0,0,0,0,1.7607L8.3193,16,2.5259,19.12a1,1,0,0,0,0,1.7607l13,7a.9995.9995,0,0,0,.9482,0l13-7a1,1,0,0,0,0-1.7607ZM16,6.1359,26.8906,12,16,17.8643,5.1094,12Zm0,19.7284L5.1094,20l5.3193-2.8642L15.5259,19.88a.9995.9995,0,0,0,.9482,0l5.0972-2.7446L26.8906,20Z'/%3E%3C/svg%3E") !important;
    background-size: 20px 20px !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
  }
  .leaflet-control-layers {
    border: 2px solid rgba(0,0,0,0.2) !important;
    border-radius: 4px !important;
  }
`;

const Maps: React.FC<MapsProps> = ({
  longitude = -74.5,
  latitude = 40,
  zoom = 9,
  width = '100%',
  height = '400px',
  markers = [],
  tileStyle = 'standard',
  onMarkerClick,
  showFullscreenControl = false,
  showLayerControl = false,
}) => {
  return (
    <div style={{ width, height, borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
      <style>{layerControlStyles}</style>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        {showLayerControl ? (
          <LayersControl position="topleft">
            <LayersControl.BaseLayer checked={tileStyle === 'standard'} name="Standard">
              <TileLayer
                attribution={getAttribution('standard')}
                url={getTileUrl('standard')}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={tileStyle === 'humanitarian'} name="Humanitarian">
              <TileLayer
                attribution={getAttribution('humanitarian')}
                url={getTileUrl('humanitarian')}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={tileStyle === 'topo'} name="Topographic">
              <TileLayer
                attribution={getAttribution('topo')}
                url={getTileUrl('topo')}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={tileStyle === 'cycle'} name="Cycling">
              <TileLayer
                attribution={getAttribution('cycle')}
                url={getTileUrl('cycle')}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        ) : (
          <TileLayer
            attribution={getAttribution(tileStyle)}
            url={getTileUrl(tileStyle)}
          />
        )}
        <MapController center={[latitude, longitude]} zoom={zoom} />
        <MapResizeHandler />
        {showFullscreenControl && <FullscreenControl />}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={marker.color ? createColoredIcon(marker.color) : defaultIcon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(marker);
                }
              },
            }}
          >
            {marker.popup && (
              <Popup>
                <div dangerouslySetInnerHTML={{ __html: marker.popup }} />
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
