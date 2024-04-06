import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private baseUrl = 'http://localhost:5000/api/weather';

  constructor(private http: HttpClient) { }

  getweatherData(): Observable<any[]> {

    const headers = new HttpHeaders({
      'token': environment.X_Api_Key
    });

    return interval(5000)
    .pipe(
      switchMap(() => this.http.get<any[]>(`${environment.BASE_API_PROD}/districts/data`, { headers: headers }))
    );
  }
}
