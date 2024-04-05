import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  districts: string = '/assets/data/sri-lanka-districts.geojson';

  constructor(private http: HttpClient, private popupService: PopupService) { }

  makeCapitalMarkers(map: L.Map): void { 
    this.http.get(this.districts).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);
        const popup = L.popup()
          .setLatLng([lat, lon])
          .setContent(`${c.properties.name}`);
        popup.options.closeButton = false;
        popup.options.closeOnClick = false;
        // const tooltip = L.tooltip()
        //   .setLatLng([lat, lon])
        //   .setContent('<p>Hello world!<br />This is a nice popup.</p>');

        // L.popup()
        //   .setLatLng([lat, lon])
        //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        //   .openOn(map);

        //marker.bindTooltip(tooltip).openTooltip();

        popup.addTo(map);
        //tooltip.addTo(map);
        marker.addTo(map);
      }
    });
  }
}
