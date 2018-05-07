import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ConsumerVo } from '../models/consumer-vo';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConsumerService {
  cookies: {};
  constructor(private http: HttpClient, private cookieService: CookieService) {}
 
    // Uses http.get() to load consumer from a API endpoint
    getListOfProjects(): Observable<any> {
      //this.cookies = this.cookieService.getAll();
      var sessionId = this.cookieService.get('sessionId');
     const apiUrl = environment.nactBackendApiUrl + "tenants/ENACTIND/getListOfLeads_new?sessionId=" + this.cookieService.get('sessionId') + "&account_id=" + this.cookieService.get('account_id') + "&search_acc_id=all&timeZoneOffSet=330";
        return this.http.get(apiUrl);
    }

    
 // Uses http.delete() to delete the consumer.
 deleteSingleConsumer(request: any): Observable<any> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
 const apiUrl = environment.nactBackendApiUrl + "consumers/deleteSingleConsumer";
    return this.http.put(apiUrl,  request);
}

}
