import { Profile } from '../../profiles/entities/Profile';
import { Tweet } from '../entities/Tweet';

export type LikeTweet = {
  profileId: string;
  tweetId: string;
};

export type GetFollowingFeed = {
  profileId: string;
};

export abstract class TweetsRepository {
  public abstract createTweet(tweet: Tweet): Promise<void>;
  public abstract findTweetAuthor(id: string): Promise<Profile>;
  public abstract getFollowingFeed({
    profileId,
  }: GetFollowingFeed): Promise<Tweet[]>;
  public abstract likeTweet({ profileId, tweetId }: LikeTweet): Promise<number>;
}
