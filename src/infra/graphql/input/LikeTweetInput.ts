import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LikeTweetInput {
  @Field()
  tweetId: string;

  @Field()
  profileId: string;
}
