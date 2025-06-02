import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private API_URL = 'http://localhost:3000/api/tours';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTours():Observable<any> {
    return this.http.get(`${this.API_URL}`, { headers: this.getHeaders() });
  }

  createTour(tourData: any) {
    return this.http.post(`${this.API_URL}`, tourData, { headers: this.getHeaders() });
  }

  updateTour(id: string, tourData: any) {
    return this.http.put(`${this.API_URL}/${id}`, tourData, { headers: this.getHeaders() });
  }

  deleteTour(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }
}
