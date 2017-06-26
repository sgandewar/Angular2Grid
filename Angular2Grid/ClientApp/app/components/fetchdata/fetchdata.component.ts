import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { IGift } from './../giftorder/gift';
import { GiftOrderService } from './../giftorder/index';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html'),
    providers: [GiftOrderService]
})
export class FetchDataComponent {

    public multiple: boolean = false;
    public allowUnsort: boolean = true;

    private sort: SortDescriptor[] = [];
    private gridView: GridDataResult;
    //public forecasts: WeatherForecast[];
    public forecasts: IGift[];
    

    private pageSize: number = 5;
    private skip: number = 0;

    errorMessage: string;
    gifts: IGift[] = [];

    constructor(http: Http, private _giftService: GiftOrderService) {
        //http.get('/api/SampleData/WeatherForecasts').subscribe(result => {
        //    this.forecasts = result.json();
        //    debugger;
        //    this.gridView = {
        //        data: orderBy(this.forecasts, this.sort),
        //        total: this.forecasts.length
        //    };
        //});

        this._giftService.getGiftOrders()
            .subscribe(results => {
                this.forecasts = results.json();
                debugger;
            this.gridView = {
                data: this.forecasts.slice(this.skip, this.skip + this.pageSize),
                total: this.forecasts.length
            };
        });
    }
    
    

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProducts();
    }

    private loadProducts(): void {
        this.gridView = {
            data: this.handleData(),
            total: this.forecasts.length
        };
    }

    protected pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadPagedItem();
    }
    private loadPagedItem(): void {
        this.gridView = {
            data: this.handleData(),
            total: this.forecasts.length
        };
    }

    private handleData() {
        var pagedData = this.forecasts.slice(this.skip, this.skip + this.pageSize)
        if (!this.sort) { return pagedData; }

        var orderedAndPagedData = orderBy(pagedData, this.sort);
        return orderedAndPagedData;
    }

}


interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
