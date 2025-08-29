import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../types/create-product.dto';
import { UpdateProductDto } from '../types/update-product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>(this.API_URL);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  create(product: CreateProductDto) {
    return this.http.post<Product>(this.API_URL, product);
  }

  update(id: number, product: UpdateProductDto) {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
