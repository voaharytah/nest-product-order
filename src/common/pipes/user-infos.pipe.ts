import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserInfosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const user = { ...value, role: 'admin' };
    return user;
  }
}
