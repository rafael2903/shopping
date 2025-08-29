import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from 'app/shared/models/product.model';
import { EllipsisPipe } from 'app/shared/pipes/ellipsis.pipe';
import { CartsService } from 'app/shared/services/carts.service';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    CurrencyPipe,
    EllipsisPipe,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private cartsService = inject(CartsService);

  @Input({ required: true }) product!: Product;

  isInCart = computed(() => this.cartsService.isInCart(this.product));

  addToCart() {
    this.cartsService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartsService.removeFromCart(this.product);
  }
}
