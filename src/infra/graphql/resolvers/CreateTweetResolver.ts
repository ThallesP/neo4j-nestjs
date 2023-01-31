import { GraphQLTweetMapper } from './../mappers/GraphQLTweetMapper';
import { CreateTweetInput } from './../input/CreateTweetInput';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTweetUseCase } from '../../../modules/tweets/useCases/createTweet/CreateTweetUseCase';
import { TweetType } from '../types/TweetType';

@Resolver()
export class CreateTweetResolver {
  constructor(private createTweetUseCase: CreateTweetUseCase) {}

  @Mutation(() => TweetType)
  async createTweet(
    @Args('tweet') createTweetInput: CreateTweetInput,
  ): Promise<TweetType> {
    const tweet = await this.createTweetUseCase.execute({
      content: createTweetInput.content,
      profileId: createTweetInput.profileId,
    });

    return GraphQLTweetMapper.toType(tweet);
  }
}
