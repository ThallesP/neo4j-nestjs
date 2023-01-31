import {
  GetFollowingFeed,
  LikeTweet,
} from './../../../../modules/tweets/repositories/TweetsRepository';
import { Injectable } from '@nestjs/common';
import { Profile } from '../../../../modules/profiles/entities/Profile';
import { Tweet } from '../../../../modules/tweets/entities/Tweet';
import { TweetsRepository } from '../../../../modules/tweets/repositories/TweetsRepository';
import { client } from '../client';
import { Transformer } from '../Transformer';

@Injectable()
export class Neo4JTweetsRepository implements TweetsRepository {
  constructor(private transformer: Transformer) {}

  public async likeTweet({ profileId, tweetId }: LikeTweet): Promise<number> {
    const session = client.session();
    const { records } = await session.run(
      `
      MATCH (tweet:Tweet{ id: $tweetId })
      MATCH (profile:Profile{ id: $profileId })
      MERGE (profile)-[:LIKED]->(tweet)
      WITH tweet
        MATCH ()-[likes:LIKED]->(tweet)
        RETURN COUNT(likes) as likes
    `,
      { profileId, tweetId },
    );

    const { likes } = this.transformer.transformRecord(records[0]);
    await session.close();

    return likes;
  }

  public async getFollowingFeed({
    profileId,
  }: GetFollowingFeed): Promise<Tweet[]> {
    const session = client.session();
    const { records } = await session.run(
      `
      MATCH (p:Profile{ id: $profileId })-[f:FOLLOWED]->(followedProfiles:Profile)
      MATCH (followedProfiles)<-[:WHO_TWEETED]-(followTweets)
      RETURN followTweets
      LIMIT 10
      `,
      { profileId },
    );

    const feed = this.transformer.transformRecords(records);
    await session.close();

    return feed.map(
      ({ followTweets: t }) =>
        new Tweet(
          {
            content: t.content,
            profileId: t.profileId,
            likes: t.likes,
            createdAt: t.createdAt,
          },
          t.id,
        ),
    );
  }

  public async findTweetAuthor(id: string): Promise<Profile> {
    const session = client.session();
    const { records } = await session.run(
      `MATCH (t:Tweet{ id: $id })-[:WHO_TWEETED]->(profile:Profile) RETURN profile`,
      { id },
    );

    const { profile } = this.transformer.transformRecord(records[0]);
    await session.close();

    return new Profile({ username: profile.username }, profile.id);
  }

  public async createTweet(tweet: Tweet): Promise<void> {
    const session = client.session();
    await session.run(
      `MATCH (profile:Profile{ id: $profileId })
      CREATE (tweet:Tweet{ id: $tweetId, content: $content, createdAt: $createdAt })-[:WHO_TWEETED]->(profile)`,
      {
        tweetId: tweet.id,
        content: tweet.content,
        profileId: tweet.profileId,
        createdAt: tweet.createdAt.toISOString(),
      },
    );
    await session.close();
  }
}
