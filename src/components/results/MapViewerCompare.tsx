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
  showPrintButton?: boolean;
}

export function MapViewerCompare({ 
  features = [], 
  className = '', 
  onMapInit,
  disableAutoZoom = false,
  showPrintButton = false
}: MapViewerCompareProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);

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
    vectorLayerRef.current = vectorLayer;

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
    if (!vectorSourceRef.current) return;

    // Clear existing features
    vectorSourceRef.current.clear();

    // Only add new features if there are any
    if (features && features.length > 0) {
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

      if (mapInstanceRef.current && !disableAutoZoom) {
        const extent = vectorSourceRef.current.getExtent();
        const view = mapInstanceRef.current.getView();
        view.fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000
        });
      }
    } else {
      // If no features, reset the view to default
      if (mapInstanceRef.current) {
        const view = mapInstanceRef.current.getView();
        view.setCenter(fromLonLat([-74.2973, 4.5709]));
        view.setZoom(6);
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
      {showPrintButton && (
        <button
          onClick={handlePrint}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          title="Imprimir mapa"
        >
          <Printer className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}