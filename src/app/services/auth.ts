import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5029/api/Auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
}