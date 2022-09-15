import { Injectable, NotFoundException } from '@nestjs/common';
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

  getProduct(id: string) {
    const product = this.findProduct(id)[0];

    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }

    if (description) {
      updatedProduct.description = description;
    }

    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((item) => item.id !== id);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((item) => item.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
