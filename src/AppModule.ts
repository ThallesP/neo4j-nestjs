import { Module } from '@nestjs/common';
import { GraphModule } from './infra/graphql/GraphQLModule';

@Module({
  imports: [GraphModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
