import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cart = signal<Map<number, Product>>(new Map());
  public readonly cart$ = this.cart.asReadonly();
  cartProductsCount = computed(() => this.cart().size);

  addToCart(product: Product) {
    if (this.cart().has(product.id)) {
      return;
    }

    this.cart.update((map) => {
      const copy = new Map(map);
      copy.set(product.id, product);
      return copy;
    });
  }

  removeFromCart(product: Product) {
    if (!this.cart().has(product.id)) {
      return;
    }

    this.cart.update((map) => {
      const copy = new Map(map);
      copy.delete(product.id);
      return copy;
    });
  }

  isInCart(product: Product) {
    return this.cart().has(product.id);
  }
}
