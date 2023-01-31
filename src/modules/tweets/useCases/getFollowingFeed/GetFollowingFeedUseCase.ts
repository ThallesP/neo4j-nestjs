import { Injectable } from '@nestjs/common';
import { TweetsRepository } from '../../repositories/TweetsRepository';

export type GetFollowingFeedData = {
  profileId: string;
};

@Injectable()
export class GetFollowingFeedUseCase {
  constructor(private tweetsRepository: TweetsRepository) {}

  async execute({ profileId }: GetFollowingFeedData) {
    const tweets = await this.tweetsRepository.getFollowingFeed({
      profileId,
    });

    return tweets;
  }
}
