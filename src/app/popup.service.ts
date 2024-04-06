import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { WeatherDataService } from './weather-data.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  districts: string = '/assets/data/sri-lanka-districts.geojson';
  private popups: L.Popup[] = [];

  constructor(
    private weatherDataService: WeatherDataService) {
  }

  addPopUps(map: L.Map, lat: any, lon: any, c: any) {
    let popup = L.popup()
      .setLatLng([lat, lon])
      .setContent(`
      <strong>District :</strong> ${c.district} <br>
      <strong>Temperature :</strong> ${c.temperature} °C<br>
      <strong>Humidity :</strong> ${c.humidity}%<br>
      <strong>Air Pressure :</strong> ${c.airPressure} mb<br>`);
    popup.options.closeButton = false;
    popup.options.closeOnClick = false;

    popup.addTo(map);
    this.popups.push(popup);
  }

  makeDistrictPopUps(map: L.Map): void {
    
    this.weatherDataService.getweatherData().subscribe((data) => {
      
      for (let j = 0; j < this.popups.length; j++) {
        this.popups[j].removeFrom(map);
      }

      const weatherData = data;

      for (let i = 0; i < weatherData.length; i++) {
        
        // for (let j = 0; j < this.popups.length; j++) {
        //   this.popups[j].removeFrom(map);
        // }

        let lon = weatherData[i].cordinates[0];
        let lat = weatherData[i].cordinates[1];
        let popup = L.popup()
          .setLatLng([lat, lon])
          .setContent(`
          <strong>District :</strong> ${weatherData[i].district} <br>
          <strong>Temperature :</strong> ${weatherData[i].temperature} °C<br>
          <strong>Humidity :</strong> ${weatherData[i].humidity}%<br>
          <strong>Air Pressure :</strong> ${weatherData[i].airPressure} hPa<br>`);
        popup.options.closeButton = false;
        popup.options.closeOnClick = false;
        popup.options.autoPan = false;

        this.popups.push(popup);
        popup.addTo(map);
      }
      // weatherData.forEach(c => {
      //   let lon = c.cordinates[0];
      //   let lat = c.cordinates[1];

      //   if (this.popups.length == 24) {
      //     // this.popups.forEach(d => {
      //     //   d.remove()
      //     //   this.popups = [];
      //     //   // d.setLatLng([lat, lon])
      //     //   // d.setContent(`
      //     //   // <strong>District :</strong> ${c.district} <br>
      //     //   // <strong>Temperature :</strong> ${c.temperature} °C<br>
      //     //   // <strong>Humidity :</strong> ${c.humidity}%<br>
      //     //   // <strong>Air Pressure :</strong> ${c.airPressure} mb<br>`)
      //     // });
      //     for (let i = 0; i < this.popups.length; i++) {
      //       this.popups[i].remove();
      //     }
      //     //this.popups.forEach((d) => d.remove());
      //     this.popups = [];
      //   } else {
      //     this.addPopUps(map, lat, lon, c);
      //   }
      // });

      // weatherData.forEach(c => {
      //   let lon = c.cordinates[0];
      //   let lat = c.cordinates[1];

      //   if (this.popups.length == 24) {
      //     // this.popups.forEach(d => {
      //     //   d.remove()
      //     //   this.popups = [];
      //     //   // d.setLatLng([lat, lon])
      //     //   // d.setContent(`
      //     //   // <strong>District :</strong> ${c.district} <br>
      //     //   // <strong>Temperature :</strong> ${c.temperature} °C<br>
      //     //   // <strong>Humidity :</strong> ${c.humidity}%<br>
      //     //   // <strong>Air Pressure :</strong> ${c.airPressure} mb<br>`)
      //     // });
      //     for (let i = 0; i < this.popups.length; i++) {
      //       this.popups[i].remove();
      //     }
      //     //this.popups.forEach((d) => d.remove());
      //     this.popups = [];
      //   } else {
      //     this.addPopUps(map, lat, lon, c);
      //   }


        
      //   // const popup = L.popup()
      //   //   .setLatLng([lat, lon])
      //   //   .setContent(`
      //   //   <strong>District :</strong> ${c.district} <br>
      //   //   <strong>Temperature :</strong> ${c.temperature} °C<br>
      //   //   <strong>Humidity :</strong> ${c.humidity}%<br>
      //   //   <strong>Air Pressure :</strong> ${c.airPressure} mb<br>`).openOn(map);
      //   // popup.options.closeButton = false;
      //   // popup.options.closeOnClick = false;
      //   //this.addPopUps(map, lat, lon);
      //   // const tooltip = L.tooltip()
      //   //   .setLatLng([lat, lon])
      //   //   .setContent('<p>Hello world!<br />This is a nice popup.</p>');
  
      //   // L.popup()
      //   //   .setLatLng([lat, lon])
      //   //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      //   //   .openOn(map);
  
      //   //marker.bindTooltip(tooltip).openTooltip();
  
      //   //popup.addTo(map);
      //   //tooltip.addTo(map);
      // });
    });

    
    
    // this.weatherDataService.getweatherData().subscribe(weatherData => {
    //   Array.from(weatherData).forEach(c => {
    //     const lon = c.cordinates[0];
    //     const lat = c.cordinates[1];
    //     //const marker = L.marker([lat, lon]);
    //     this.addPopUps(map, lat, lon)
    //     // const tooltip = L.tooltip()
    //     //   .setLatLng([lat, lon])
    //     //   .setContent('<p>Hello world!<br />This is a nice popup.</p>');
  
    //     // L.popup()
    //     //   .setLatLng([lat, lon])
    //     //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //     //   .openOn(map);
  
    //     //marker.bindTooltip(tooltip).openTooltip();

    //     //popup.addTo(map);
    //     //tooltip.addTo(map);
    //     //marker.addTo(map);
    //   });
    // });

    
  }
}
