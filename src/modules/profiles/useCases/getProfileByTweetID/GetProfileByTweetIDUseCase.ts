import { Injectable } from '@nestjs/common';
import { TweetsRepository } from '../../../tweets/repositories/TweetsRepository';

export type GetProfileByTweetData = {
  tweetId: string;
};

@Injectable()
export class GetProfileByTweetIDUseCase {
  constructor(private tweetsRepository: TweetsRepository) {}

  async execute({ tweetId }: GetProfileByTweetData) {
    const profile = await this.tweetsRepository.findTweetAuthor(tweetId);

    return profile;
  }
}
