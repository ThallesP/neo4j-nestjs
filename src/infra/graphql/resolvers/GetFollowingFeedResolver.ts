import { GetFollowingFeedInput } from './../input/GetFollowingFeedInput';
import { GetProfileByTweetIDUseCase } from '../../../modules/profiles/useCases/getProfileByTweetID/GetProfileByTweetIDUseCase';
import { TweetType } from '../types/TweetType';
import { GraphQLTweetMapper } from '../mappers/GraphQLTweetMapper';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileType } from '../types/ProfileType';
import { Tweet } from '../../../modules/tweets/entities/Tweet';
import { GraphQLProfileMapper } from '../mappers/GraphQLProfileMapper';
import { GetFollowingFeedUseCase } from '../../../modules/tweets/useCases/getFollowingFeed/GetFollowingFeedUseCase';

@Resolver(() => TweetType)
export class GetFollowingFeedResolver {
  constructor(
    private getFollowingFeedUseCase: GetFollowingFeedUseCase,
    private getProfileByTweetIDUseCase: GetProfileByTweetIDUseCase,
  ) {}

  @Query(() => [TweetType])
  async getFollowingFeed(
    @Args('following') getFollowingFeedInput: GetFollowingFeedInput,
  ): Promise<TweetType[]> {
    const feed = await this.getFollowingFeedUseCase.execute({
      profileId: getFollowingFeedInput.profileId,
    });

    return feed.map(GraphQLTweetMapper.toType);
  }

  @ResolveField('author', (returns) => ProfileType)
  async author(@Parent() tweet: Tweet) {
    const profile = await this.getProfileByTweetIDUseCase.execute({
      tweetId: tweet.id,
    });

    return GraphQLProfileMapper.toType(profile);
  }
}
