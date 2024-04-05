import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private baseUrl = 'http://localhost:5000/api/weather';

  constructor(private http: HttpClient) { }

  getweatherData(): Observable<any[]> {
    return interval(5000)
    .pipe(
      switchMap(() => this.http.get<any[]>(`${this.baseUrl}/districts/data`))
    );
  }
}
