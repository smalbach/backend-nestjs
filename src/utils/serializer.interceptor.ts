import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { User } from 'src/modules/users/entities/user.entity';
import deepMapObject from './deep-map-object';
import { map } from 'rxjs/operators';
import userResponseSerializer from 'src/modules/users/user-response.serializer';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return deepMapObject(data, (value) => {
          if (value.__entity === 'User') {
            userResponseSerializer(value as User);
          }

          return value;
        });
      }),
    );
  }
}
