import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProfileUseCase } from '../../../modules/profiles/useCases/createProfile/CreateProfileUseCase';
import { CreateProfileInput } from '../input/CreateProfileInput';
import { ProfileType } from '../types/ProfileType';
import { GraphQLProfileMapper } from '../mappers/GraphQLProfileMapper';

@Resolver()
export class CreateProfileResolver {
  constructor(private createProfileUseCase: CreateProfileUseCase) {}

  @Mutation(() => ProfileType)
  async createProfile(
    @Args('profile') createProfileInput: CreateProfileInput,
  ): Promise<ProfileType> {
    const profile = await this.createProfileUseCase.execute({
      username: createProfileInput.username,
    });

    return GraphQLProfileMapper.toType(profile);
  }
}
