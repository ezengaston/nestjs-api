import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): number {
    const id = uuid();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }
}
