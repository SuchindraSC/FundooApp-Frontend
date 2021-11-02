import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(
    private httpService: HttpServiceService
  ) { }

  Register(data: any){
    const params = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Emailid: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}api/register`, params)
  }

  Login(data: any){
    const params = {
      Emailid: data.email,
      Password: data.password,
    };
    return this.httpService.post(`${environment.baseUrl}api/login`, params);
  }

  Forgot(data: any){
    //let params = new HttpParams().set('Emailid', data.Emailid);
    return this.httpService.post(
      `${environment.baseUrl}api/forgotpassword?Emailid=${data.email}`
    );
  }

  Reset(email: string, data: any){
    let params = {
      Emailid: email,
      Password: data.password,
    };
    return this.httpService.put(
      `${environment.baseUrl}api/resetpassword`,
      params
    );
  }
}
