import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
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

  async getAllProducts() {
    const res = await this.productModel.find().exec();
    return res.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  async getProduct(id: string) {
    const res = await this.findProduct(id);

    return {
      id: res.id,
      title: res.title,
      description: res.description,
      price: res.price,
    };
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(id);

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    updatedProduct.save();
  }

  async deleteProduct(id: string) {
    const res = await this.productModel.deleteOne({ _id: id }).exec();
    if (res.deletedCount === 0) {
      throw new NotFoundException('Could not find a product');
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let res;
    try {
      res = await this.productModel.findById(id).exec();
      if (!res) {
        throw new NotFoundException('Could not find a product');
      }
    } catch (e) {
      throw new NotFoundException('Could not find a product');
    }

    return res;
  }
}
