import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl';
import 'mapbox-gl-leaflet';
import { ACCESS_TOKEN, API_KEY } from 'src/shared/constants/authTokens';
import { Tour } from 'src/shared/models/Tour';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input()
  locations: [{}];
  private tour: Tour;
  private map: L.Map;
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit(): void {
    {
      L.Icon.Default.imagePath = 'assets/leaflet/';
    }
  }
  ngAfterViewInit() {
    const myAPIKey = API_KEY;
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

    const initialState = {
      lng: -77.034203,
      lat: 38.904118,
      zoom: 9,
    };

    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // the attribution is required for the Geoapify Free tariff plan
    map.attributionControl
      .setPrefix('')
      .addAttribution(
        'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
      );

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: ACCESS_TOKEN,
    }).addTo(map);
    this.locations.forEach((el: any) => {
      L.marker([el.coordinates[1], el.coordinates[0]])
        .bindPopup('deded')
        .openPopup()
        .addTo(map);
    });
    // L.marker([38.904118, -77.034203]).addTo(map).bindPopup('deded').openPopup();
    // console.log(this.locations);
  }
}
