import { Injectable } from '@nestjs/common';
import { Tweet } from '../../entities/Tweet';
import { TweetsRepository } from '../../repositories/TweetsRepository';

export type CreateTweetData = {
  content: string;
  profileId: string;
};

@Injectable()
export class CreateTweetUseCase {
  constructor(private tweetsRepository: TweetsRepository) {}

  async execute({ content, profileId }: CreateTweetData) {
    const tweet = new Tweet({ content, profileId, likes: 0 });

    await this.tweetsRepository.createTweet(tweet);

    return tweet;
  }
}
