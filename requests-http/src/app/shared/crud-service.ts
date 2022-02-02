import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { T } from './t';

//para generalizar o tipo
//export class CrudService<T>{
export class CrudService {
  constructor(protected http: HttpClient, private API_URL: string) {}

  list() {
    return this.http.get<T[]>(this.API_URL).pipe(delay(200));
  }

  loadById(id: number) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(record: T) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  private update(record: T) {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: T) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
