import { Criteria } from '@data/model/criteria.model';
import { Product } from '@data/do/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  saveProduct(product: Product): Promise<Product> {
    return this.save(product);
  }

  findProduct(id: number): Promise<Product> {
    return this.findOne(id);
  }

  productsList(criteria: Criteria): Promise<Product[]> {
    return this.createQueryBuilder('product')
      .skip(criteria.skip)
      .take(criteria.take)
      .getMany();
  }

  deleteProduct(id: number) {
    return this.delete(id);
  }

  searchProducts(criteria: Criteria) {
    return this.createQueryBuilder('product')
      .where('product.label like :term', { term: `%${criteria.searchTerm}%` })
      .orWhere('product.description like :term', {
        term: `%${criteria.searchTerm}%`,
      })
      .skip(criteria.skip)
      .take(criteria.take)
      .getManyAndCount()
      .then(resuults => {
        return {
          products: resuults[0],
          count: resuults[1],
        };
      });
  }
}
