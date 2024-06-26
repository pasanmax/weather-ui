import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from '../popup.service';
import { WeatherDataService } from '../weather-data.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 10, 80.5795 ],
      zoom: 8,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 10,
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);

  }

  constructor(
    private popupService: PopUpService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.popupService.makeDistrictPopUps(this.map);
  }
}
