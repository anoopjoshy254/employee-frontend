import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

export interface DashboardResponse {
  totalEmployees: number;
  totalDepartments: number;
  latestEmployees: Employee[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5029/api/Employee';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(
      'http://localhost:5029/api/dashboard',
      { headers: this.getHeaders() }
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
  return this.http.get<Employee>(
    `${this.apiUrl}/${id}`,
    { headers: this.getHeaders() }
  );
}

  addEmployee(employee: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      employee,
      { headers: this.getHeaders() }
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/${id}`,
    employee,
    { headers: this.getHeaders() }
  );
}

  deleteEmployee(id: number): Observable<any> {
  return this.http.delete(
    `${this.apiUrl}/${id}`,
    { headers: this.getHeaders() }
  );
}
}