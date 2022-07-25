import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: 'CURRENT_USER',
      inject: [REQUEST],
      useFactory: (req: Request) => {
        return req;
      },
      scope: Scope.REQUEST,
    },
  ],
  exports: ['CURRENT_USER'],
})
export class CurrentUserModule {}
