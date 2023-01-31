import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class ProfileType {
  @Field()
  id: string;

  @Field()
  username: string;
}
