import { Type } from 'class-transformer';
import {
  IsDefined,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CommandDto {
  @IsDefined()
  customerId: number;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(type => RowCommandDto)
  rowCommands: RowCommandDto[];
}

export class RowCommandDto {
  @IsDefined()
  productId: number;

  @IsDefined()
  qte: number;
}
