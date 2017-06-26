﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IGift } from './gift';

@Injectable()
export class GiftOrderService {
    private _productUrl = '/Gift-sampleData.json';

    constructor(private _http: Http) { }

    getProducts(): Observable<IGift[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IGift[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)));
            //.catch(this.handleError);
    }

    getGiftOrders() {
        return this._http.get(this._productUrl)
            .map((response: Response) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)));
        //.catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
