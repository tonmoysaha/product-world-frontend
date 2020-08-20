import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductworldformsService {

  constructor() { }

  getCreditCardsMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    for (let month = startMonth ; month <= 12 ; month++){
      data.push(month);
    }
    return of(data);
  }

  getCreditCardsYears(): Observable<number[]>{

    let data: number[] = [];
    const currentYear: number = new Date().getFullYear();
    const endLength: number = currentYear+10;

    for (let year = currentYear; year <= endLength; year++){
      data.push(year);
    }

    return of(data);
  }


}
