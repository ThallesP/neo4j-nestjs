import { GetFollowingFeedResolver } from './resolvers/GetFollowingFeedResolver';
import { CreateTweetUseCase } from '../../modules/tweets/useCases/createTweet/CreateTweetUseCase';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CreateTweetResolver } from './resolvers/CreateTweetResolver';
import { DatabaseModule } from '../database/DatabaseModule';
import { GetProfileByTweetIDUseCase } from '../../modules/profiles/useCases/getProfileByTweetID/GetProfileByTweetIDUseCase';
import { LikeTweetResolver } from './resolvers/LikeTweetResolver';
import { LikeTweetUseCase } from '../../modules/tweets/useCases/likeTweet/LikeTweetUseCase';
import { FollowProfileResolver } from './resolvers/FollowProfileResolver';
import { FollowProfileUseCase } from '../../modules/profiles/useCases/followProfile/FollowProfileUseCase';
import { GetFollowingFeedUseCase } from '../../modules/tweets/useCases/getFollowingFeed/GetFollowingFeedUseCase';
import { CreateProfileResolver } from './resolvers/CreateProfileResolver';
import { CreateProfileUseCase } from '../../modules/profiles/useCases/createProfile/CreateProfileUseCase';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    CreateProfileResolver,
    CreateProfileUseCase,
    CreateTweetUseCase,
    CreateTweetResolver,
    GetFollowingFeedResolver,
    GetFollowingFeedUseCase,
    GetProfileByTweetIDUseCase,
    LikeTweetResolver,
    LikeTweetUseCase,
    FollowProfileResolver,
    FollowProfileUseCase,
  ],
})
export class GraphModule {}
