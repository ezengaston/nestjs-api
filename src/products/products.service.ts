import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    const res = await newProduct.save();
    return res.id;
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
