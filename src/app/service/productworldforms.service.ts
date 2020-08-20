import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Country} from '../common/country';
import {map} from 'rxjs/operators';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ProductworldformsService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

  getCreditCardsMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }
    return of(data);
  }

  getCreditCardsYears(): Observable<number[]> {

    let data: number[] = [];
    const currentYear: number = new Date().getFullYear();
    const endLength: number = currentYear + 10;

    for (let year = currentYear; year <= endLength; year++) {
      data.push(year);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    const coutriesUrl = `${this.baseUrl}/countries`;
    return this.httpClient.get<getCountriesResponse>(coutriesUrl).pipe(map(
      response => response._embedded.country
    ));
  }

  getStates(countryCode: string): Observable<State[]> {
    const statesUrl = `${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`;
    return this.httpClient.get<getStatesResponse>(statesUrl).pipe(map(
      response => response._embedded.states
    ));
  }
}

interface getCountriesResponse {
  _embedded: {
    country: Country[];
  }
}

interface getStatesResponse {
  _embedded: {
    states: State[];
  }
}
