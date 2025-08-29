import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ShopComponent } from './pages/shop/shop.component';
import { notLoggedInGuard } from './core/guards/not-logged-in.guard';

export const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent, canActivate: [notLoggedInGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
