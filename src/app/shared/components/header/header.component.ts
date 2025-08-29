import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { CartsService } from 'app/shared/services/carts.service';

@Component({
  selector: 'app-header',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private cartsService = inject(CartsService);
  private router = inject(Router);

  isUserLogged = this.authService.isUserLogged;
  isUserAdmin = this.authService.isAdmin;
  cartProductsCount = this.cartsService.cartProductsCount;
  query = '';

  logout() {
    this.authService.logout();
  }

  search() {
    this.router.navigate(['/shop'], {
      queryParams: { q: this.query }
    });
  }
}
