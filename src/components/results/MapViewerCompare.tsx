import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Style, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import 'ol/ol.css';

interface MapViewerCompareProps {
  features?: any[];
  className?: string;
  onMapInit?: (map: Map) => void;
  disableAutoZoom?: boolean;
}

export function MapViewerCompare({ 
  features = [], 
  className = '', 
  onMapInit,
  disableAutoZoom = false 
}: MapViewerCompareProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const featuresRef = useRef<any[]>(features);

  useEffect(() => {
    if (!mapRef.current) return;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(234, 88, 12, 0.3)'
        }),
        stroke: new Stroke({
          color: '#ea580c',
          width: 2
        })
      })
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([-74.2973, 4.5709]),
        zoom: 6
      })
    });

    mapInstanceRef.current = map;
    
    if (onMapInit) {
      onMapInit(map);
    }

    return () => {
      map.setTarget(undefined);
    };
  }, [onMapInit]);

  useEffect(() => {
    if (!vectorSourceRef.current || features === featuresRef.current) return;

    featuresRef.current = features;

    if (features.length > 0) {
      vectorSourceRef.current.clear();
      const geoJsonData = {
        type: 'FeatureCollection',
        features
      };
      
      vectorSourceRef.current.addFeatures(
        new GeoJSON().readFeatures(geoJsonData, {
          featureProjection: 'EPSG:3857',
          dataProjection: 'EPSG:4326'
        })
      );

      if (!disableAutoZoom && mapInstanceRef.current) {
        const extent = vectorSourceRef.current.getExtent();
        const view = mapInstanceRef.current.getView();
        const currentZoom = view.getZoom();
        const currentCenter = view.getCenter();

        if (currentZoom === 6 && currentCenter && 
            currentCenter[0] === fromLonLat([-74.2973, 4.5709])[0] && 
            currentCenter[1] === fromLonLat([-74.2973, 4.5709])[1]) {
          view.fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 1000
          });
        }
      }
    }
  }, [features, disableAutoZoom]);

  const handlePrint = () => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    
    // Create a high-resolution canvas
    const canvas = document.createElement('canvas');
    const pixelRatio = 2; // Increase pixel ratio for better quality
    const size = map.getSize();
    
    if (!size) return;
    
    const [width, height] = size;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    const context = canvas.getContext('2d');
    if (!context) return;

    // Scale the context for higher resolution
    context.scale(pixelRatio, pixelRatio);

    // Get the current view state
    const view = map.getView();
    const originalCenter = view.getCenter();
    const originalResolution = view.getResolution();
    const originalRotation = view.getRotation();

    // Render map at current extent
    Array.from(map.getViewport().getElementsByTagName('canvas')).forEach(
      (canvas: HTMLCanvasElement) => {
        if (canvas.width > 0) {
          const opacity = canvas.parentElement?.style.opacity || canvas.style.opacity;
          context.globalAlpha = opacity === '' ? 1 : Number(opacity);
          
          // Use better quality rendering
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
          
          context.drawImage(canvas, 0, 0, width, height);
        }
      }
    );

    // Reset view state
    if (originalCenter && originalResolution) {
      view.setCenter(originalCenter);
      view.setResolution(originalResolution);
      view.setRotation(originalRotation || 0);
    }

    // Create PDF with higher quality
    const pdf = new jsPDF({
      orientation: width > height ? 'l' : 'p',
      unit: 'px',
      format: [width, height],
      compress: false // Disable compression for better quality
    });

    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0), // Use maximum JPEG quality
      'JPEG',
      0,
      0,
      width,
      height,
      undefined,
      'NONE' // Remove FAST option to maintain quality
    );

    pdf.save('mapa-comparacion.pdf');
  };

  return (
    <div className="relative h-full">
      <div ref={mapRef} className={className} />
      <button
        onClick={handlePrint}
        className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        title="Imprimir mapa"
      >
        <Printer className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}