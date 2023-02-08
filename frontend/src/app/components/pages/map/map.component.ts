import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import {
  bounds,
  icon,
  LatLng,
  latLngBounds,
  LatLngExpression,
  map,
  Map,
  Marker,
  marker,
  Point,
  point,
  popup,
  Popup,
  tileLayer,
} from 'leaflet';
import 'mapbox-gl';
import 'mapbox-gl-leaflet';
import { ACCESS_TOKEN, API_KEY } from 'src/shared/constants/authTokens';
import { ILeaflet } from 'src/shared/interfaces/ILeaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @Input()
  locations: ILeaflet[];

  // private tour: Tour;
  private map!: Map;
  private popup: Popup;
  private markers: Marker[] = [];
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNGL: L.LatLngTuple = [33.99644, -118.203129];
  @ViewChild('map') mapEl: ElementRef<HTMLMapElement>;
  constructor() {}

  ngOnInit(): void {}

  inializeMap() {
    const points: LatLngExpression[] = [];

    if (this.map) return;
    this.map = map(this.mapEl.nativeElement, {
      attributionControl: false,
      zoomControl: false,
      dragging: false,
    });
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // marker([33.99644, -118.203129]).addTo(this.map);

    this.locations.forEach((location, i) => {
      const [lat, lng] = location.coordinates.toString().split(',');
      points.push([parseFloat(lng), parseFloat(lat)]);
      this.markers.push(
        marker([parseFloat(lng), parseFloat(lat)], {
          draggable: true,
          icon: this.MARKER_ICON,
          title: `marker_${i}`,
        })
          .addTo(this.map)
          .bindPopup(
            popup({
              autoClose: false,
              closeOnClick: false,
              content: `Day ${location.day}: ${location.description}`,
              offset: new Point(0, -25),
              className: 'popup',
            })
          )
      );
    });

    console.log(this.markers);
    this.map.fitBounds(latLngBounds(points).pad(0.5));
    this.map.scrollWheelZoom.disable();

    this.markers.forEach((marker) => {
      marker.openPopup();
    });
  }
  // }
  ngAfterViewInit() {
    this.inializeMap();
  }
}

//   const myAPIKey = API_KEY;
//   const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

//   const initialState = {
//     lng: -77.034203,
//     lat: 38.904118,
//     zoom: 9,
//   };

//   const map = new L.Map(this.mapEl.nativeElement).setView(
//     [initialState.lat, initialState.lng],
//     initialState.zoom
//   );

//   // the attribution is required for the Geoapify Free tariff plan
//   map.attributionControl
//     .setPrefix('')
//     .addAttribution(
//       'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
//     );

//   L.mapboxGL({
//     style: `${mapStyle}?apiKey=${myAPIKey}`,
//     accessToken: ACCESS_TOKEN,
//   }).addTo(map);
//   this.locations.forEach((el: any) => {
//     L.marker([el.coordinates[0], el.coordinates[1]])
//       .addTo(map)

//       .openPopup();
//   });
//   // L.marker([38.904118, -77.034203]).addTo(map).bindPopup('deded').openPopup();
//   // console.log(this.locations);
