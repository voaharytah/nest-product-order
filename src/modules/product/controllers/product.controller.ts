import { Criteria } from '@data/model/criteria.model';
import { ProductDto } from '@data/dto/product.dto';
import { ProductService } from '@services/product/product.service';
import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('save')
  saveProduct(@Body() productDto: ProductDto) {
    return this.productService.saveProduct(productDto);
  }

  @Post('list')
  productsList(@Body() criteria: Criteria) {
    return this.productService.productsList(criteria);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Post('search')
  searchProducts(@Body() criteria: Criteria) {
    return this.productService.searchProducts(criteria);
  }

  @Get(':id')
  findProduct(@Param() id: number) {
    return this.productService.findProduct(id);
  }
}
