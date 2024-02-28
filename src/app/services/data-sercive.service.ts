import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from 'app/models/product';
import IProduct from 'app/interfaces/product';

const baseUrl: string = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private getData<T extends I, I>(path: string, cl: { new(item: I): T }): Observable<T[] | null> {
    return this.http.get<T[]>(`${path}`).pipe(
      map((res: T[]) => res.map(item => new cl(item))),
      catchError(error => {
        console.error(error.message);
        return of(null); // or return null; depending on your preference
      })
    )
  }

  public getProducts(): Observable<Product[]> {
    return this.getData<Product, IProduct>(`${baseUrl}/products`, Product)
      .pipe(
        map((res: Product[] | null) => {
          if (res && res.length > 0) {
            return res
          } else {
            return []
          }
        })
    )
  }
}
