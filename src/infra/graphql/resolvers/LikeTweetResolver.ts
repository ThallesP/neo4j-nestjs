import { LikeTweetInput } from './../input/LikeTweetInput';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TweetsRepository } from '../../../modules/tweets/repositories/TweetsRepository';

@Resolver()
export class LikeTweetResolver {
  constructor(private tweetsRepository: TweetsRepository) {}

  @Mutation(() => Number)
  async likeTweet(@Args('likeTweet') likeTweetInput: LikeTweetInput) {
    const likes = await this.tweetsRepository.likeTweet({
      profileId: likeTweetInput.profileId,
      tweetId: likeTweetInput.tweetId,
    });

    return likes;
  }
}
