import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class TweetType {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field()
  likes: number;
}
