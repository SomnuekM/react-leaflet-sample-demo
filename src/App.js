import L from 'leaflet';
import React, { useRef, useEffect } from 'react';
import { Map, TileLayer, LayersControl, ZoomControl  } from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

import logoTitle from './images/logo-title.svg';


const defaultCenter =  [14.0790606839815, 100.600900053978];
const defaultZoom = 8;

function App() {
  const mapRef = useRef();

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;

    setTimeout(() => {
      map.flyTo(defaultCenter, 10, {
        duration: 3
      });
    }, 1000)


    L.Control.Watermark = L.Control.extend({
      onAdd: function(map) {
          var img = L.DomUtil.create('img');
          img.src = logoTitle;
          img.style.width = '124px';
          return img;
      },
      onRemove: function(map) {
          // Nothing to do here
      }
  });
  
  L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
  }
  L.control.watermark({ position: 'bottomleft' }).addTo(map);

    map.on('fullscreenchange', handleOnToggleFullscreen);

  }, []);

  function handleOnToggleFullscreen() {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    console.log(`Fullscreen: ${map.isFullscreen() ? 'yes' : 'no'}`);
  }

  return (
    <div className="App">
      <Map ref={mapRef} fullscreenControl={true} center={defaultCenter} zoom={defaultZoom} zoomControl={false}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer  name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="NASAGibsBlueMarble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

         	<LayersControl.BaseLayer checked name="Dia">
						<TileLayer 
            attribution='&copy; <a href="#">cartocdn</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"/>
					</LayersControl.BaseLayer>

					<LayersControl.BaseLayer name="Noite">
						<TileLayer 
            attribution='&copy; <a href="#">cartocdn</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"/>
					</LayersControl.BaseLayer>

					<LayersControl.BaseLayer name="ArcGIS">
						<TileLayer 
            attribution='&copy; <a href="https://www.arcgis.com/">ArcGIS</a>'
            url="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
					</LayersControl.BaseLayer>


          <LayersControl.BaseLayer  image='./images/logo-title.svg' name="Google Hybrid">
						<TileLayer 
              attribution='&copy; <a href="https://google.com">Google</a>'
              url="http://mt1.googleapis.com/vt?lyrs=y&x={x}&y={y}&z={z}"
            />
					</LayersControl.BaseLayer>

          <LayersControl.BaseLayer  image='./images/logo-title.svg' name="Google Roadmap">
						<TileLayer 
              attribution='&copy; <a href="https://google.com">Google</a>'
              url="http://mt1.googleapis.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            />
					</LayersControl.BaseLayer>

          <LayersControl.BaseLayer  image='./images/logo-title.svg' name="Google Terrain">
						<TileLayer 
              attribution='&copy; <a href="https://google.com">Google</a>'
              url="http://mt1.googleapis.com/vt?lyrs=p&x={x}&y={y}&z={z}"
            />
					</LayersControl.BaseLayer>

          {
          /*  h = roads only
              m = standard roadmap
              p = terrain
              r = somehow altered roadmap
              s = satellite only
              t = terrain only
              y = hybrid */
          }
          
      </LayersControl>
        
      <ZoomControl position="bottomright" zoomInText="➕" zoomOutText="➖"  />
       
       
      </Map>
    </div>
  );
}

export default App;
