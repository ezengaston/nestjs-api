import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: number } {
    const id = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id };
  }

  @Get()
  getAllProducts() {
    const products = this.productsService.getAllProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param() params: { id: string }) {
    const product = this.productsService.getProduct(params.id);
    return product;
  }
}
