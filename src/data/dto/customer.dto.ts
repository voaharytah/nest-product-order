import { IsDefined } from 'class-validator';

export class CustomerDto {
  @IsDefined()
  name: string;

  @IsDefined()
  address: string;

  @IsDefined()
  phone: string;
}
