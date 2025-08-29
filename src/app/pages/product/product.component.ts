import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from 'app/shared/models/product.model';
import { CartsService } from 'app/shared/services/carts.service';
import { ProductsService } from 'app/shared/services/products.service';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private cartsService = inject(CartsService);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  private product = signal<Product | null>(null);
  public readonly product$ = this.product.asReadonly();

  productId = this.activatedRoute.snapshot.params['id'];

  isInCart = computed(
    () => !!this.product() && this.cartsService.isInCart(this.product()!)
  );

  ngOnInit() {
    this.loadProductData();
  }

  loadProductData() {
    this.productsService.getById(this.productId).subscribe((product) => {
      this.product.set(product);
      console.log(product);
    });
  }

  addToCart() {
    if (this.product()) {
      this.cartsService.addToCart(this.product()!);
    }
  }

  removeFromCart() {
    if (this.product()) {
      this.cartsService.removeFromCart(this.product()!);
    }
  }
}
