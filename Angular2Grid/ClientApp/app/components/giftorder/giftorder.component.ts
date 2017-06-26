import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { IGift } from './gift';
import { GiftOrderService } from './index';
import * as _ from "lodash";



import { PagerService } from './../pagination/pagination.service';

@Component({
    selector: 'giftorder',
    template: require('./giftorder.component.html'),
    providers: [GiftOrderService, PagerService]
})

export class giftorderComponent implements OnInit {

    sortBy: string = '';
    sortOrder: string = '';

    constructor(private http: Http, private _giftService: GiftOrderService, private pagerService: PagerService) {

    }

    errorMessage: string;
    gifts: IGift[] = [];

    private allItems: any[] = [
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2016-1/2/2016",
            "orderedDate": "20/1/2016",
            "giftItem": "Blanket"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2016-1/2/2016",
            "orderedDate": "20/1/2016",
            "giftItem": "Blanket"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        },
        {
            "autoOrderedDate": "1/1/2017-1/2/2017",
            "orderedDate": "20/1/2017",
            "giftItem": "DreamCatcher"
        }
    ];
    ngOnInit() {

        this._giftService.getProducts()
            .subscribe((products) => {
                this.gifts = products;
                this.setPage(1);
            });
           
        //error => this.errorMessage = <any>error);



    }


    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }


        this.allItems = this.gifts;
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    /**
     * Sort items
     */
    sortGiftOrders(field: string, sortOrder: string) {
        debugger;
        this.sortBy = field;
        this.sortOrder = sortOrder;

        //if (field === 'giftItem') {
        //    this.gifts = _.orderBy(this.gifts, [(e) => e.GiftOrdered.toLowerCase()], [sortOrder]);
        //} else {
        this.gifts = _.orderBy(this.gifts, [field], [sortOrder]);
        //}
        if (this.gifts && this.gifts.length > 0) {
            this.setPage(1);
        }
    }

}

