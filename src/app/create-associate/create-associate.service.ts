import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../model/employee.model';
import { Skill } from '../model/skill.model';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateAssociateService {

  headers: Headers;
  options: RequestOptions;

  constructor( private http: Http,
    private httpClient: HttpClient) {
      this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8', 
                                   'Accept': 'application/json, */*' });
      this.options = new RequestOptions({ headers: this.headers });
  }

  getSkills (): Observable<any> {
    return this.http.get('http://localhost:8090/skilltracker/viewallskills', this.options)
                    .map(this.extractData)
                    .do(data => console.log(data))
                    .catch(this.handleError);
  }



addAssociate(file: File, data: Employee): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('data', JSON.stringify(data));
    const req = new HttpRequest('POST', 'http://localhost:8090/skilltracker/addAssociates', formdata, {
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }


deleteEmployee(param: string): Observable<any> {
    return this.http.delete('http://localhost:8090/skilltracker/deleteEmployee/' + param, this.options)
      .map(this.extractData)
      .do(data => console.log("get categories from json: " + JSON.stringify(data)))
      .catch(this.handleError);
  }


  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || "500 internal server error");
  }

}