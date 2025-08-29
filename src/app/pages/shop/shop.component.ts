import { Component } from '@angular/core';
import { ProductsListComponent } from 'app/shared/components/products-list/products-list.component';

@Component({
  selector: 'app-shop',
  imports: [ProductsListComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

}
