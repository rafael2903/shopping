import { Product } from '../models/product.model';

export interface CreateProductDto extends Omit<Product, 'id'> {}
