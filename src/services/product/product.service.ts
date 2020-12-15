import { Criteria } from '@data/model/criteria.model';
import { plainToClass } from 'class-transformer';
import { ProductDto } from '@data/dto/product.dto';
import { Product } from '@data/do/product.entity';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@repository/product/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  saveProduct(productDto: ProductDto): Promise<Product> {
    const product = plainToClass(Product, productDto);
    return this.productRepository.saveProduct(product);
  }

  productsList(criteria: Criteria): Promise<Product[]> {
    return this.productRepository.productsList(criteria);
  }

  deleteProduct(id: number) {
    return this.productRepository.deleteProduct(id);
  }

  findProduct(id: number): Promise<Product> {
    return this.productRepository.findProduct(id);
  }

  searchProducts(criteria: Criteria) {
    return this.productRepository.searchProducts(criteria);
  }
}
