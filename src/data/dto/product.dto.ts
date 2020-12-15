import { IsDefined } from 'class-validator';

export class ProductDto {
  @IsDefined()
  label: string;

  @IsDefined()
  stock: number;

  @IsDefined()
  pu: number;
}
