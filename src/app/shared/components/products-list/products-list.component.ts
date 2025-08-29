import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private query = signal('');
  private products = signal<Product[]>([]);
  public readonly products$ = computed(() =>
    this.getFilteredProducts(this.query())
  );

  ngOnInit() {
    this.loadProducts();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.query.set(params['q'] || '');
    });
  }

  loadProducts() {
    this.productsService.getAll().subscribe((products) => {
      this.products.set(products);
    });
  }

  getFilteredProducts(query: string) {
    return this.products().filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
