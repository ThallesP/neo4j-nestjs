import { Profile } from '../../../modules/profiles/entities/Profile';
import { Tweet } from '../../../modules/tweets/entities/Tweet';
import { TweetType } from '../types/TweetType';

export class GraphQLTweetMapper {
  static toType({ content, id, likes }: Tweet): TweetType {
    return {
      content,
      id,
      likes,
    };
  }
}
