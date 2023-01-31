import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field()
  content: string;

  @Field()
  profileId: string;
}
