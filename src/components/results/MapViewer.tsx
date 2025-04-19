import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Style, Fill, Stroke, Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Printer, Search } from 'lucide-react';
import jsPDF from 'jspdf';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

interface MapViewerProps {
  features?: any[];
  className?: string;
  onMapInit?: (map: Map) => void;
  disableAutoZoom?: boolean;
  showPrintButton?: boolean;
  onMunicipalityQuery?: (municipalityData: {
    municipalityId: string;
    municipalityName: string;
    departmentId: string;
    departmentName: string;
  }) => void;
}

export function MapViewer({ 
  features = [], 
  className = '', 
  onMapInit,
  disableAutoZoom = false,
  showPrintButton = false,
  onMunicipalityQuery
}: MapViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const featuresRef = useRef<any[]>(features);
  const initialLoadRef = useRef(true);
  const [popupContent, setPopupContent] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentFeatureProperties, setCurrentFeatureProperties] = useState<any>(null);
  const overlayRef = useRef<Overlay | null>(null);

  useEffect(() => {
    if (!mapRef.current || !popupRef.current) return;

    // Create overlay for popup
    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: false,
      autoPanAnimation: {
        duration: 250,
      },
    });
    overlayRef.current = overlay;

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const properties = feature.getProperties();
        console.log("**Properties poligon:", properties);
        
        // Create the polygon style
        const polygonStyle = new Style({
          fill: new Fill({
            color: 'rgba(59, 130, 246, 0.3)'
          }),
          stroke: new Stroke({
            color: '#2563eb',
            width: 2
          })
        });

        // If there's text to display, create a text style
        if (properties.text) {
          const textStyle = new Style({
            text: new Text({
              text: properties.text,
              font: properties.textStyle?.font || '12px Arial',
              fill: new Fill({
                color: properties.textStyle?.fill || '#000'
              }),
              stroke: new Stroke({
                color: properties.textStyle?.stroke || '#fff',
                width: properties.textStyle?.strokeWidth || 3
              }),
              offsetY: properties.textStyle?.offsetY || -15
            })
          });

          // Return both styles
          return [polygonStyle, textStyle];
        }

        // Return only polygon style if no text
        return polygonStyle;
      }
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
      }),
      overlays: [overlay]
    });

    // Add click handler for feature identification
    map.on('click', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
      
      if (feature) {
        const properties = feature.getProperties();
        setCurrentFeatureProperties(properties);
        let content = '<div class="p-4 max-w-sm">';
        
        // Add municipality name if available
        if (properties.text) {
          content += `<h3 class="font-bold text-lg mb-2">${properties.text}</h3>`;
        }

        // Add all other properties except geometry and style-related ones
        Object.entries(properties).forEach(([key, value]) => {
          if (
            key !== 'geometry' && 
            key !== 'text' && 
            key !== 'textStyle' &&
            value !== undefined &&
            value !== null
          ) {
            console.log("**key", key);
            content += `<p class="text-sm"><strong>${key}:</strong> ${value}</p>`;
          }
        });

        content += '</div>';
        setPopupContent(content);
        setShowPopup(true);
        
        const coordinate = evt.coordinate;
        overlayRef.current?.setPosition(coordinate);
      } else {
        setShowPopup(false);
        setCurrentFeatureProperties(null);
        overlayRef.current?.setPosition(undefined);
      }
    });

    // Add pointer cursor for features
    map.on('pointermove', (evt) => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      const target = map.getTarget() as HTMLElement;
      target.style.cursor = hit ? 'pointer' : '';
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

      if (mapInstanceRef.current && !disableAutoZoom) {
        const extent = vectorSourceRef.current.getExtent();
        const view = mapInstanceRef.current.getView();
        view.fit(extent, {
          padding: [50, 50, 50, 50],
          duration: 1000
        });
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

    pdf.save('mapa.pdf');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentFeatureProperties(null);
    if (overlayRef.current) {
      overlayRef.current.setPosition(undefined);
    }
  };

  const handleQueryMunicipality = () => {
    if (!currentFeatureProperties || !onMunicipalityQuery) return;

    const {
      idMunicipio,
      Municipio,
      idDepartamento,
      Departamento
    } = currentFeatureProperties;

    if (idMunicipio && Municipio && idDepartamento && Departamento) {
      onMunicipalityQuery({
        municipalityId: idMunicipio,
        municipalityName: Municipio,
        departmentId: idDepartamento,
        departmentName: Departamento
      });
      handleClosePopup();
    }
  };

  const canQueryMunicipality = 
    currentFeatureProperties?.idMunicipio &&
    currentFeatureProperties?.Municipio &&
    currentFeatureProperties?.idDepartamento &&
    currentFeatureProperties?.Departamento;

  return (
    <div className="relative h-full">
      <div ref={mapRef} className={className} />
      
      {/* Popup overlay */}
      <div 
        ref={popupRef} 
        className={`absolute z-50 bg-white rounded-lg shadow-lg ${showPopup ? 'block' : 'hidden'}`}
      >
        <button 
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
          onClick={handleClosePopup}
        >
          ×
        </button>
        <div dangerouslySetInnerHTML={{ __html: popupContent }} />
        {canQueryMunicipality && (
          <div className="px-4 pb-4">
            <button
              onClick={handleQueryMunicipality}
              className="w-full flex items-center justify-center gap-2 px-2 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <Search size={16} />
              <span>Consultar Municipio</span>
            </button>
          </div>
        )}
      </div>

      {showPrintButton && (
        <button
          onClick={handlePrint}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Imprimir mapa"
        >
          <Printer className="h-5 w-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}