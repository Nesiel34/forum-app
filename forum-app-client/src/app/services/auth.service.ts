import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interface/IUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userId!:number;
  register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, user);
  }

  login(user: User): Observable<any> {
    const params = new HttpParams()
    .set('username', user.username)
    .set('passwordHash', user.passwordHash);
    return this.http.post(`${environment.apiUrl}/user/login`, user);
  }
}
