import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('before...');
    console.log(`I'm a interceptor.`);
    return next
      .handle()
      .pipe(
        tap(() => console.log(`after... ${Date.now() - now}ms`))
      );
  }
}
