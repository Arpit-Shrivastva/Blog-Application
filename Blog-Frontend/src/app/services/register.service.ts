import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  endPoint = "http://localhost:8081/api/v1/user";

  registerSaveEndPoint(register: Register): Observable<Register> {
    return this.httpClient.post<Register>(`${this.endPoint}/save`, register);
  }

  getAllUser(): Observable<Register[]> {
    return this.httpClient.get<Register[]>(`${this.endPoint}/`);
  }

  getUserByEmail(email: string): Observable<Register> {
    return this.httpClient.get<Register>(`${this.endPoint}/${email}`);
  }

  deleteUser(email: string): Observable<any> {
    return this.httpClient.delete(`${this.endPoint}/${email}`);
  }

  loginUser(email: string, password: string): Observable<string> {
    const payload = { email, password };
    return this.httpClient.post<string>(`${this.endPoint}/login`, payload);
  }

}
