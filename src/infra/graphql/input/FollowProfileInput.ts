import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FollowProfileInput {
  @Field()
  followerId: string;

  @Field()
  profileId: string;
}
