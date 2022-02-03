import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, Observable, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  total: number = 0;
  query = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  //Mostra campos buscado por Angular para testes -> this.SEARCH_URL+this.fields
  readonly FIELDS: string =
    '?fields=name,description,version,homepage&search=angular';
  results$: Observable<any> = new Observable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.query.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 2),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: { search: value, fields: this.FIELDS },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.query.value;

    const params_ = {
      search: value,
      fields: fields,
    };

    let params = new HttpParams();
    params = params.set('search', value);
    params = params.set('fields', fields);

    if (value && (value = value.trim()) !== '') {
      this.results$ = this.http
        //.get(`${this.SEARCH_URL}?fields=${FIELDS}&search=${value}`)
        //monta a url
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
