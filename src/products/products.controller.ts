import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const id = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param() params: { id: string }) {
    const product = await this.productsService.getProduct(params.id);
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    await this.productsService.updateProduct(id, title, description, price);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
    return null;
  }
}
