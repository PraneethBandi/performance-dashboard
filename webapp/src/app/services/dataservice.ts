import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class dataservice {

    constructor(private http: Http) { };

    private serverBaseUrl: string = "http://localhost:3000/api/";
    public getRuns():Promise<any> {
        let url = this.serverBaseUrl + 'run/'
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    public getRunDetails(runid: string): Promise<any> {
        let url = this.serverBaseUrl + 'run/' + runid;
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
}