import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FollowProfileUseCase } from '../../../modules/profiles/useCases/followProfile/FollowProfileUseCase';
import { FollowProfileInput } from '../input/FollowProfileInput';

@Resolver()
export class FollowProfileResolver {
  constructor(private followProfileUseCase: FollowProfileUseCase) {}

  @Mutation(() => Number)
  async followProfile(
    @Args('follow') followProfileInput: FollowProfileInput,
  ): Promise<number> {
    const followCount = await this.followProfileUseCase.execute({
      followerId: followProfileInput.followerId,
      profileId: followProfileInput.profileId,
    });

    return followCount;
  }
}
