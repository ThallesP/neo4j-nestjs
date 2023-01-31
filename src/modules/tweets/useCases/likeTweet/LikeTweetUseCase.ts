import { Injectable } from '@nestjs/common';
import { TweetsRepository } from '../../repositories/TweetsRepository';

export type LikeTweetData = {
  profileId: string;
  tweetId: string;
};

@Injectable()
export class LikeTweetUseCase {
  constructor(private tweetsRepository: TweetsRepository) {}

  async execute({ profileId, tweetId }: LikeTweetData) {
    const tweetLikes = await this.tweetsRepository.likeTweet({
      profileId,
      tweetId,
    });

    return tweetLikes;
  }
}
